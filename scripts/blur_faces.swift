import AppKit
import CoreImage
import ImageIO
import Vision

let arguments = CommandLine.arguments
guard arguments.count == 3 else {
  fputs("Usage: swift blur_faces.swift <input-directory> <output-directory>\n", stderr)
  exit(64)
}

let inputDirectory = URL(fileURLWithPath: arguments[1], isDirectory: true)
let outputDirectory = URL(fileURLWithPath: arguments[2], isDirectory: true)
try FileManager.default.createDirectory(at: outputDirectory, withIntermediateDirectories: true)

let context = CIContext(options: [.useSoftwareRenderer: false])
let files = try FileManager.default.contentsOfDirectory(at: inputDirectory, includingPropertiesForKeys: nil)
  .filter { ["png", "jpg", "jpeg"].contains($0.pathExtension.lowercased()) }

func faces(in image: CGImage) -> [VNFaceObservation] {
  let request = VNDetectFaceRectanglesRequest()
  let handler = VNImageRequestHandler(cgImage: image, orientation: .up)
  do {
    try handler.perform([request])
    return request.results ?? []
  } catch {
    return []
  }
}

func faceRect(_ face: VNFaceObservation, width: Int, height: Int) -> CGRect {
  let box = face.boundingBox
  let raw = CGRect(
    x: box.minX * CGFloat(width),
    y: (1 - box.maxY) * CGFloat(height),
    width: box.width * CGFloat(width),
    height: box.height * CGFloat(height)
  )
  // Une marge discrète : elle protège le contour du visage, sans masquer
  // toute la tête ni les épaules.
  let padding = max(raw.width, raw.height) * 0.18
  return raw.insetBy(dx: -padding, dy: -padding)
    .intersection(CGRect(x: 0, y: 0, width: width, height: height))
    .integral
}

func poseHeadRect(in image: CGImage) -> CGRect? {
  let request = VNDetectHumanBodyPoseRequest()
  let handler = VNImageRequestHandler(cgImage: image, orientation: .up)
  do {
    try handler.perform([request])
    guard let pose = request.results?.first,
          let points = try? pose.recognizedPoints(.all),
          let nose = points[.nose], nose.confidence > 0.1 else { return nil }

    let width = CGFloat(image.width)
    let height = CGFloat(image.height)
    // Solution de repli uniquement lorsqu'aucun visage n'est détecté.
    // Le masque reste serré autour du nez afin de ne jamais couvrir la tête
    // ou le haut du buste en entier.
    // Proportionné à la photo : le visage d'un plan rapproché est plus grand
    // que celui d'une photo en pied. Cela garde un masque discret, mais utile.
    let faceWidth = min(max(width * 0.15, 82), 460)
    let faceHeight = faceWidth * 1.05
    let centerX = nose.location.x * width
    let centerY = nose.location.y * height + faceHeight * 0.09
    return CGRect(x: centerX - faceWidth / 2, y: centerY - faceHeight / 2, width: faceWidth, height: faceHeight)
      .intersection(CGRect(x: 0, y: 0, width: width, height: height))
      .integral
  } catch {
    return nil
  }
}

func blurFaces(in image: CGImage, detectedFaces: [VNFaceObservation]) -> CGImage? {
  let width = image.width
  let height = image.height
  // La pose humaine est plus fiable ici que la détection de visage seule :
  // les mains, genoux ou vêtements peuvent parfois être pris pour un visage
  // dans les photos d'exercices. La détection de visage reste le repli.
  let detectedRects = poseHeadRect(in: image).map { [$0] }
    ?? detectedFaces.map { faceRect($0, width: width, height: height) }
  guard !detectedRects.isEmpty else { return image }
  let colorSpace = CGColorSpaceCreateDeviceRGB()
  guard let output = CGContext(
    data: nil,
    width: width,
    height: height,
    bitsPerComponent: 8,
    bytesPerRow: width * 4,
    space: colorSpace,
    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
  ) else { return nil }

  output.interpolationQuality = .high
  output.setFillColor(NSColor.white.cgColor)
  output.fill(CGRect(x: 0, y: 0, width: width, height: height))
  output.draw(image, in: CGRect(x: 0, y: 0, width: width, height: height))
  let source = CIImage(cgImage: image)
  let whiteCanvas = CIImage(color: CIColor.white).cropped(to: source.extent)
  let flattenedSource = source.composited(over: whiteCanvas)

  for rect in detectedRects {
    guard !rect.isEmpty else { continue }
    let ciRect = CGRect(x: rect.minX, y: CGFloat(height) - rect.maxY, width: rect.width, height: rect.height)
    let blur = flattenedSource.applyingFilter("CIGaussianBlur", parameters: [kCIInputRadiusKey: max(12, rect.width * 0.07)]).cropped(to: ciRect)
    guard let blurred = context.createCGImage(blur, from: ciRect) else { continue }

    output.saveGState()
    let path = CGPath(ellipseIn: rect, transform: nil)
    output.addPath(path)
    output.clip()
    output.draw(blurred, in: rect)
    output.restoreGState()
  }

  return output.makeImage()
}

var changed = 0
var noFace = 0
for file in files {
  guard let source = CGImageSourceCreateWithURL(file as CFURL, nil),
        let image = CGImageSourceCreateImageAtIndex(source, 0, nil) else { continue }

  let detectedFaces = faces(in: image)
  if detectedFaces.isEmpty { noFace += 1 } else { changed += 1 }
  guard let result = blurFaces(in: image, detectedFaces: detectedFaces) else { continue }

  let destination = outputDirectory.appendingPathComponent(file.deletingPathExtension().lastPathComponent + ".png")
  guard let writer = CGImageDestinationCreateWithURL(destination as CFURL, kUTTypePNG, 1, nil) else { continue }
  CGImageDestinationAddImage(writer, result, nil)
  CGImageDestinationFinalize(writer)
}

print("Anonymisation terminée : \(changed) image(s) avec visage flouté, \(noFace) image(s) sans visage détecté.")
