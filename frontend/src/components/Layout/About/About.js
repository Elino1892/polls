import classes from './About.module.css'

const About = () => {
  return (
    <div className={classes.about}>
      <div className={classes["about-1"]}>
        <p className={classes["about-text-1"]}>
          Zapoznaj się z opinią innych na wybrany przez ciebie temat lub wyraź swoją opinię wypełniając
          utworzone
          przez innych użytkowników ankiety.
        </p>

        <div className={classes["about-image-1"]}>
          <img src="../../../images/about-1.jpeg" alt="about1" />
        </div>

        <p className={classes["about-text-2"]}>
          Ankiety mogą zawierać pytania jedno/wielo-krotnego wyboru, odpowiedzi w formie krótkiej wypowiedzi
          pisemnej,
          a także i obrazki.
        </p>

        {/* Inna struktura na większe rozdzielczości - potrzebne do flexboxa*/}
        <div className={classes["about-text"]}>
          <p className={classes["about-text-p1"]}>
            Zapoznaj się z opinią innych na wybrany przez ciebie temat lub wyraź swoją opinię wypełniając
            utworzone
            przez innych użytkowników ankiety.
          </p>

          <p className={classes["about-text-p2"]}>
            Ankiety mogą zawierać pytania jedno/wielo-krotnego wyboru, odpowiedzi w formie krótkiej
            wypowiedzi
            pisemnej,
            a także i obrazki.
          </p>
        </div>
      </div>

      <div className={classes["about-2"]}>
        <p className={classes["about-text-1"]}>
          Jako autor ankiety masz dostęp do danych zebranych podczas udzielania odpowiedzi przez innych
          użytkowników.
        </p>

        <div className={classes["about-image-2"]}>
          <img src="../../../images/about-2.jpeg" alt="about2" />
        </div>

        <p className={classes["about-text-2"]}>
          Dane te są przedstawiane w postaci generowanych raportów, z których wynika m.in jaką odpowiedź na
          dane
          pytanie wybrała większość osób.
        </p>

        {/* Inna struktura na większe rozdzielczości - potrzebne do flexboxa */}
        <div className={classes["about-text"]}>
          <p className={classes["about-text-p1"]}>
            Jako autor ankiety masz dostęp do danych zebranych podczas udzielania odpowiedzi przez innych
            użytkowników.
          </p>

          <p className={classes["about-text-p2"]}>
            Dane te są przedstawiane w postaci generowanych raportów, z których wynika m.in jaką odpowiedź
            na
            dane
            pytanie wybrała większość osób.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About;