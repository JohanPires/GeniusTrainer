import React from "react";

const Confidentiality = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Charte de Confidentialité</h1>
      <p>
        <strong>Dernière mise à jour : [Date]</strong>
      </p>

      <p>
        Nous nous engageons à protéger la confidentialité de nos utilisateurs.
        Cette charte de confidentialité décrit comment nous collectons,
        utilisons, partageons et protégeons vos informations personnelles
        lorsque vous utilisez notre site <strong>[Nom du Site]</strong>{" "}
        accessible à l’URL{" "}
        <a href="[URL du Site]" target="_blank" rel="noopener noreferrer">
          [URL du Site]
        </a>
        .
      </p>

      <h2>1. Informations que nous collectons</h2>
      <p>
        Nous pouvons collecter et traiter les types d'informations suivants :
      </p>
      <ul>
        <li>
          <strong>Informations personnelles</strong> : nom, adresse e-mail,
          numéro de téléphone, adresse postale, etc.
        </li>
        <li>
          <strong>Informations de compte</strong> : identifiants, mot de passe,
          préférences de communication.
        </li>
        <li>
          <strong>Informations techniques</strong> : adresse IP, type de
          navigateur, système d'exploitation, pages visitées, durée de la
          visite, etc.
        </li>
        <li>
          <strong>Cookies et technologies similaires</strong> : nous utilisons
          des cookies pour améliorer votre expérience sur notre site.
        </li>
      </ul>

      <h2>2. Utilisation de vos informations</h2>
      <p>Nous utilisons vos informations personnelles pour :</p>
      <ul>
        <li>Fournir et maintenir nos services.</li>
        <li>Améliorer, personnaliser et développer nos services.</li>
        <li>
          Communiquer avec vous, y compris pour répondre à vos questions et vous
          envoyer des mises à jour.
        </li>
        <li>Analyser l'utilisation de notre site pour améliorer nos offres.</li>
      </ul>

      <h2>3. Partage de vos informations</h2>
      <p>
        Nous ne vendons pas vos informations personnelles. Nous pouvons partager
        vos informations avec :
      </p>
      <ul>
        <li>
          <strong>Prestataires de services</strong> : des tiers qui fournissent
          des services en notre nom (hébergement, support client, analyse de
          données, etc.).
        </li>
        <li>
          <strong>Autorités légales</strong> : si requis par la loi ou en
          réponse à des demandes légales.
        </li>
        <li>
          <strong>En cas de fusion ou d'acquisition</strong> : vos informations
          pourraient être transférées en cas de restructuration de notre
          entreprise.
        </li>
      </ul>

      <h2>4. Vos droits</h2>
      <p>
        Vous disposez de plusieurs droits concernant vos informations
        personnelles :
      </p>
      <ul>
        <li>
          <strong>Droit d'accès</strong> : demander une copie des informations
          que nous détenons à votre sujet.
        </li>
        <li>
          <strong>Droit de rectification</strong> : demander la correction de
          vos informations inexactes ou incomplètes.
        </li>
        <li>
          <strong>Droit d'effacement</strong> : demander la suppression de vos
          informations personnelles.
        </li>
        <li>
          <strong>Droit d'opposition</strong> : vous pouvez vous opposer au
          traitement de vos informations dans certaines circonstances.
        </li>
        <li>
          <strong>Droit à la portabilité</strong> : demander le transfert de vos
          informations à un tiers.
        </li>
      </ul>
      <p>
        Pour exercer vos droits, veuillez nous contacter à l'adresse suivante :{" "}
        <strong>[Adresse e-mail de contact]</strong>.
      </p>

      <h2>5. Sécurité de vos informations</h2>
      <p>
        Nous prenons des mesures techniques et organisationnelles appropriées
        pour protéger vos informations personnelles contre la perte, le vol et
        l'accès non autorisé. Cependant, aucune méthode de transmission sur
        Internet ou de stockage électronique n'est entièrement sécurisée.
      </p>

      <h2>6. Modifications de cette charte</h2>
      <p>
        Nous pouvons mettre à jour cette charte de confidentialité de temps à
        autre. Nous vous informerons de tout changement en publiant la nouvelle
        charte sur notre site avec une date de mise à jour.
      </p>

      <h2>7. Nous contacter</h2>
      <p>
        Pour toute question concernant cette charte de confidentialité, veuillez
        nous contacter à :
      </p>
      <ul>
        <li>
          <strong>Par email</strong> :{" "}
          <a href="mailto:[Adresse e-mail]">[Adresse e-mail]</a>
        </li>
        <li>
          <strong>Par courrier</strong> : [Adresse physique]
        </li>
      </ul>
    </div>
  );
};

export default Confidentiality;
