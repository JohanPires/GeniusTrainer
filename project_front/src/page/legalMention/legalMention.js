import React from "react";

function LegalMention() {
  return (
    <div className="legal mention h-screen flex flex-col">
      <h1>MENTIONS LÉGALES</h1>

      <p>
        Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour
        la confiance en l'économie numérique, il est précisé aux utilisateurs du
        site <strong>geniustrainer</strong> l'identité des différents
        intervenants dans le cadre de sa réalisation et de son suivi.
      </p>

      <h2>Édition du site</h2>
      <p>
        Le présent site, accessible à l’URL{" "}
        <a
          href="https://geniustrainer.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://geniustrainer.netlify.app/
        </a>{" "}
        (le « Site »), est édité par :
      </p>
      <p>
        Johan Pires, résidant 123 avenue des Champs Elysée, de nationalité
        Française (France), né(e) le 24/08/2000.
      </p>

      <h2>Hébergement</h2>
      <p>
        Le Site est hébergé par la société O2Switch, situé 222 Boulevard Gustave
        Flaubert, 63000 Clermont-Ferrand, (contact téléphonique ou email : (+33)
        4 44 44 60 40).
      </p>

      <h2>Directeur de publication</h2>
      <p>Le Directeur de la publication du Site est Johan Pires.</p>

      <h2>Nous contacter</h2>
      <p>Par téléphone : +33612548963</p>
      <p>
        Par email : <a href="mailto:johan@gmail.com">johan@gmail.com</a>
      </p>
      <p>Par courrier : 123 avenue des Champs Elysée</p>

      <p>Génération des mentions légales par Legalstart.</p>
    </div>
  );
}

export default LegalMention;
