import "./Job.css";
import jobs from "../data/jobs";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Anchor, Briefcase, Compass, Languages, Moon, Settings, Ship, Sun, Wrench, Zap } from "lucide-react";
import { archiveProfile, clearProfile, emptyProfile, exportLocalBackup, importLocalBackup, readProfile, readProfileArchive, removeArchivedProfile, saveProfile } from "../utils/profile";
import { useTranslation } from "../i18n";
import { localizedJob } from "../utils/localize";

const jobIcons = {
  1: Briefcase,
  2: Compass,
  3: Anchor,
  4: Ship,
  5: Settings,
  6: Settings,
  7: Wrench,
  8: Zap,
  9: Compass,
  10: Settings,
};
const jobTranslations = { en:["Captain","First officer","Boatswain","Seafarer","Chief engineer","Second engineer","Engineer","Electrician","Deck officer","Engineering officer"], es:["Capitán","Primer oficial","Contramaestre","Marinero","Jefe de máquinas","Segundo maquinista","Maquinista","Electricista","Oficial de cubierta","Oficial de máquinas"], pt:["Comandante","Imediato","Contramestre","Marinheiro","Chefe de máquinas","Segundo maquinista","Maquinista","Eletricista","Oficial de convés","Oficial de máquinas"], zh:["船长","大副","水手长","水手","轮机长","二管轮","轮机员","电工","甲板员","轮机员"], ar:["القبطان","الضابط الأول","رئيس البحارة","بحّار","كبير المهندسين","المهندس الثاني","مهندس","كهربائي","ضابط سطح","ضابط هندسة"], ru:["Капитан","Старший помощник","Боцман","Матрос","Старший механик","Второй механик","Механик","Электрик","Палубный офицер","Судовой механик"], tl:["Kapitan","Unang opisyal","Bosun","Marino","Punong inhinyero","Ikalawang inhinyero","Inhinyero","Elektrisyan","Opisyal ng kubyerta","Opisyal ng makina"] };
const levelTranslations = { en:["Beginner","Intermediate","Advanced"], es:["Principiante","Intermedio","Avanzado"], pt:["Iniciante","Intermediário","Avançado"], zh:["初级","中级","高级"], ar:["مبتدئ","متوسط","متقدم"], ru:["Начальный","Средний","Продвинутый"], tl:["Baguhan","Katamtaman","Bihasa"] };

function Job() {

    const navigate = useNavigate();
    const [savedProfile, setSavedProfile] = useState(readProfile);
    const [selectedJob, setSelectedJob] = useState(savedProfile.jobId);
    const [firstName, setFirstName] = useState(savedProfile.firstName);
    const [age, setAge] = useState(savedProfile.age);
    const [isAgeValidated, setIsAgeValidated] = useState(false);
    const [level, setLevel] = useState(savedProfile.level);
    const [archive, setArchive] = useState(readProfileArchive);
    const [backupMessage, setBackupMessage] = useState("");
    const backupInputRef = useRef(null);
    const { t, language, setLanguage } = useTranslation();
    const [theme, setTheme] = useState(() => localStorage.getItem("musculoprevent-theme") ?? "light");
    const ageNumber = Number(age);
    const ageMessage = isAgeValidated && age !== "" && ageNumber < 16 ? t("tooYoung") : isAgeValidated && age !== "" && ageNumber > 90 ? t("tooOld") : "";
    const isProfileComplete = Boolean(firstName.trim() && level && selectedJob && age !== "" && ageNumber >= 16 && ageNumber <= 90);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("musculoprevent-theme", theme);
    }, [theme]);

    const continueToExercises = () => {
        if (selectedJob) {
            const profile = archiveProfile({ firstName, age, level, jobId: selectedJob, archiveId: savedProfile.archiveId });
            setSavedProfile(profile);
            setArchive(readProfileArchive());
            navigate(`/exercises/job/${selectedJob}`);
        }
    };

    const resetProfile = () => {
        clearProfile();
        setSavedProfile(emptyProfile);
        setSelectedJob(null);
        setFirstName("");
        setAge("");
        setIsAgeValidated(false);
        setLevel("");
    };

    const loadArchivedProfile = (profile) => {
        saveProfile(profile);
        setSavedProfile(profile);
        setSelectedJob(profile.jobId);
        setFirstName(profile.firstName);
        setAge(profile.age);
        setIsAgeValidated(false);
        setLevel(profile.level);
    };

    const deleteArchivedProfile = (archiveId) => {
        removeArchivedProfile(archiveId);
        setArchive(readProfileArchive());
        if (savedProfile.archiveId === archiveId) resetProfile();
    };
    const activeArchivedProfile = archive.find((profile) => profile.archiveId === savedProfile.archiveId);
    const profileInitials = (activeArchivedProfile?.firstName || firstName || "?").trim().slice(0, 1).toUpperCase();
    const downloadBackup = () => {
        const blob = new Blob([exportLocalBackup()], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `musculoprevent-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`;
        link.click();
        URL.revokeObjectURL(url);
        setBackupMessage(t("backupDownloaded"));
    };
    const restoreBackup = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const imported = importLocalBackup(await file.text());
        if (imported) {
            const nextProfile = readProfile();
            setSavedProfile(nextProfile); setArchive(readProfileArchive()); setSelectedJob(nextProfile.jobId); setFirstName(nextProfile.firstName); setAge(nextProfile.age); setLevel(nextProfile.level);
        }
        setBackupMessage(imported ? t("backupRestored") : t("backupInvalid"));
        event.target.value = "";
    };

    return (

            <section className="profile-step">


                <h1>{t("yourProfile")}</h1>
                <p className="profile-intro">{t("profileIntro")}</p>
                {savedProfile.jobId && <p className="profile-saved">{t("profileSaved")}</p>}

                {archive.length > 0 && <section className="profile-archive" aria-label={t("profileArchive")}>
                    <div className="profile-archive-heading"><span>{t("profileArchive")}</span><small>{t("profileArchiveHelp")}</small></div>
                    <div className="profile-archive-selector"><span className="profile-archive-avatar" aria-hidden="true">{profileInitials}</span><select value={savedProfile.archiveId ?? ""} onChange={(event) => {
                        const profile = archive.find((item) => item.archiveId === event.target.value);
                        if (profile) loadArchivedProfile(profile); else resetProfile();
                    }}><option value="">{t("newProfile")}</option>{archive.map((profile) => <option key={profile.archiveId} value={profile.archiveId}>{profile.firstName || t("unnamedProfile")} · {localizedJob(jobs.find((job) => job.id === profile.jobId), t)}</option>)}</select>
                    {savedProfile.archiveId && <button className="profile-archive-delete" type="button" onClick={() => deleteArchivedProfile(savedProfile.archiveId)} aria-label={t("deleteProfile")}>×</button>}</div>
                </section>}

                <section className="profile-backup" aria-label={t("profileBackup")}>
                    <div><strong>{t("profileBackup")}</strong><span>{t("profileBackupHelp")}</span></div>
                    <div className="profile-backup-actions"><button type="button" onClick={downloadBackup}>{t("exportBackup")}</button><button type="button" onClick={() => backupInputRef.current?.click()}>{t("importBackup")}</button><input ref={backupInputRef} type="file" accept="application/json,.json" onChange={restoreBackup} /></div>
                    {backupMessage && <small>{backupMessage}</small>}
                </section>

                <section className="profile-preferences" aria-label={t("preferences")}>
                    <div><strong>{t("preferences")}</strong><span>{t("preferencesHelp")}</span></div>
                    <div className="profile-preference-controls">
                        <div className="profile-theme-options" role="group" aria-label={t("appearance")}>
                            <button className={theme === "light" ? "is-active" : ""} type="button" onClick={() => setTheme("light")} aria-pressed={theme === "light"}><Sun size={15} />{t("light")}</button>
                            <button className={theme === "dark" ? "is-active" : ""} type="button" onClick={() => setTheme("dark")} aria-pressed={theme === "dark"}><Moon size={15} />{t("dark")}</button>
                        </div>
                        <div className="profile-language-options" role="group" aria-label={t("languageSwitcher")}>
                            <Languages size={15} aria-hidden="true" />
                            <button className={language === "fr" ? "is-active" : ""} type="button" onClick={() => setLanguage("fr")} aria-pressed={language === "fr"}>FR</button>
                            <button className={language === "en" ? "is-active" : ""} type="button" onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
                        </div>
                    </div>
                </section>

                <div className="profile-form">
                    <label className={`profile-field profile-field-full ${firstName.trim() ? "" : "profile-field-missing"}`}>
                        <span>{t("firstName")}{!firstName.trim() && <em>{t("required")}</em>}</span>
                        <input aria-invalid={!firstName.trim()} value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder={t("firstNamePlaceholder")} />
                    </label>

                    <label className={`profile-field ${age !== "" && ageNumber >= 16 && ageNumber <= 90 ? "" : "profile-field-missing"}`}>
                        <span>{t("age")}{!(age !== "" && ageNumber >= 16 && ageNumber <= 90) && <em>{t("required")}</em>}</span>
                        <input aria-invalid={!(age !== "" && ageNumber >= 16 && ageNumber <= 90)} type="number" min="16" max="90" value={age} onChange={(event) => { setAge(event.target.value); setIsAgeValidated(false); }} onKeyDown={(event) => { if (event.key === "Enter") setIsAgeValidated(true); }} placeholder={t("agePlaceholder")} />
                        {ageMessage && <small className="profile-field-error">{ageMessage}</small>}
                    </label>

                    <fieldset className={`profile-field profile-level ${level ? "" : "profile-field-missing"}`}>
                        <legend>{t("level")}{!level && <em>{t("required")}</em>}</legend>
                        <div className="profile-level-options">
                            {["Débutant", "Intermédiaire", "Confirmé"].map((option, index) => (
                                <button
                                    key={option}
                                    type="button"
                                    className={level === option ? "is-selected" : ""}
                                    aria-pressed={level === option}
                                    onClick={() => setLevel((currentLevel) => currentLevel === option ? "" : option)}
                                >
                                    {levelTranslations[language]?.[index] ?? option}
                                </button>
                            ))}
                        </div>
                    </fieldset>
                </div>

                <p className={`profile-jobs-label ${selectedJob ? "" : "profile-jobs-label-missing"}`}>{t("job")}{!selectedJob && <em>{t("required")}</em>}</p>

                <div className={`job-grid ${selectedJob ? "" : "job-grid-missing"}`}>

                    {jobs.map((job) => (
                        (() => {
                            const Icon = jobIcons[job.id];

                            return <button
                            key={job.id}
                            type="button"
                            className={`job-option ${selectedJob === job.id ? "job-option-selected" : ""}`}
                            aria-pressed={selectedJob === job.id}
                            onClick={() => setSelectedJob((currentJob) => currentJob === job.id ? null : job.id)}
                        >

                            <div className="job-icon">
                                <Icon aria-hidden="true" strokeWidth={1.8} />
                            </div>

                            <h2>{jobTranslations[language]?.[job.id - 1] ?? job.name}</h2>

                        </button>;
                        })()
                    ))}

                </div>

                <button className="profile-continue" type="button" disabled={!isProfileComplete} onClick={continueToExercises}>
                    {t("continue")}
                </button>

                <button className="profile-skip" type="button" onClick={() => navigate("/body-zone")}>
                    {t("skipStep")}
                </button>

                {savedProfile.jobId && <button className="profile-reset" type="button" onClick={resetProfile}>
                    {t("resetProfile")}
                </button>}
                {savedProfile.archiveId && <button className="profile-delete-active" type="button" onClick={() => deleteArchivedProfile(savedProfile.archiveId)}>
                    {t("deleteActiveProfile")}
                </button>}

            </section>

    );
}

export default Job;
