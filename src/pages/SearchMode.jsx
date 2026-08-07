import "./SearchMode.css";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, Crosshair } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

function SearchMode() {

    const navigate = useNavigate();
    const { t } = useTranslation();

    return (

            <section className="search-page">

                <p className="page-eyebrow">{t("library")}</p>
                <h1>{t("howStart")}</h1>

                <p className="page-intro">{t("choosePath")}</p>

                <div className="cards">

                    <button
                        type="button"
                        className="card-choice"
                        onClick={() => navigate("/job")}
                    >

                        <BriefcaseBusiness className="choice-icon" strokeWidth={1.7} />

                        <h2>{t("byJobTitle")}</h2>

                        <p>
                            {t("byJobText")}
                        </p>
                        <ArrowRight className="choice-arrow" size={20} />

                    </button>

                    <button
                        type="button"
                        className="card-choice"
                        onClick={() => navigate("/body-zone")}
                    >

                        <Crosshair className="choice-icon" strokeWidth={1.7} />

                        <h2>{t("byZoneTitle")}</h2>

                        <p>
                            {t("byZoneText")}
                        </p>
                        <ArrowRight className="choice-arrow" size={20} />

                    </button>

                </div>

            </section>
    );
}

export default SearchMode;
