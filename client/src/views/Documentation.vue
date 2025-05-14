<template>
  <div class="documentation">
    <h1>📚 Documentation de l'API – Port de Plaisance de Russell</h1>

    <section>
      <h2>🔐 Authentification</h2>
      <p>
        L'API est protégée. Pour accéder aux routes, vous devez d’abord vous authentifier via la route suivante :
      </p>
      <pre><code>POST /login</code></pre>
      <p><strong>Corps attendu :</strong></p>
      <pre><code>{
  "email": "utilisateur@example.com",
  "password": "motdepasse"
}</code></pre>
      <p><strong>Réponse :</strong></p>
      <pre><code>{
  "token": "votre_token_jwt"
}</code></pre>
      <p>Ajoutez ce token dans les en-têtes :</p>
      <pre><code>Authorization: Bearer VOTRE_TOKEN</code></pre>
    </section>

    <section>
      <h2>🚢 Ressource : Catways</h2>
      <ul>
        <li><code>GET /catways</code> – Liste tous les catways</li>
        <li><code>GET /catways/:id</code> – Détail d’un catway</li>
        <li><code>POST /catways</code> – Créer un catway</li>
        <li><code>PUT /catways/:id</code> – Remplacer un catway</li>
        <li><code>PATCH /catways/:id</code> – Modifier partiellement un catway</li>
        <li><code>DELETE /catways/:id</code> – Supprimer un catway</li>
      </ul>
      <p><strong>Corps POST attendu :</strong></p>
      <pre><code>{
  "catwayNumber": 12,
  "type": "long",
  "catwayState": "neuf"
}</code></pre>
    </section>

    <section>
      <h2>📅 Ressource : Réservations</h2>
      <ul>
        <li><code>GET /catways/:id/reservations</code> – Toutes les réservations pour un catway</li>
        <li><code>GET /catways/:id/reservations/:idReservation</code> – Détail d'une réservation</li>
        <li><code>POST /catways/:id/reservations</code> – Créer une réservation</li>
        <li><code>DELETE /catways/:id/reservations/:idReservation</code> – Supprimer une réservation</li>
      </ul>
      <p><strong>Corps POST attendu :</strong></p>
      <pre><code>{
  "clientName": "Jean Dupont",
  "boatName": "Le Vagabond",
  "checkIn": "2025-06-01",
  "checkOut": "2025-06-07"
}</code></pre>
    </section>

    <section>
      <h2>👤 Ressource : Utilisateurs</h2>
      <ul>
        <li><code>POST /users</code> – Créer un utilisateur</li>
        <li><code>PUT /users/:id</code> – Modifier un utilisateur</li>
        <li><code>DELETE /users/:id</code> – Supprimer un utilisateur</li>
      </ul>
    </section>

    <section>
      <h2>🧪 Tests</h2>
      <p>
        Chaque fonctionnalité a été testée avec : validation des entrées, réponses HTTP correctes, gestion des erreurs.
      </p>
    </section>

    <section>
      <h2>🌐 Hébergement</h2>
      <ul>
        <li><strong>Frontend :</strong> <a href="https://aesthetic-lily-a6e69e.netlify.app" target="_blank">Netlify</a></li>
        <li><strong>Backend :</strong> <a href="https://capitainerie-back.onrender.com" target="_blank">Render</a></li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.documentation {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  line-height: 1.6;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}
pre {
  background: #f3f3f3;
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto;
}
code {
  font-family: 'Courier New', monospace;
  color: #2c3e50;
}
ul {
  padding-left: 1.2rem;
}
section {
  margin-bottom: 2rem;
}
h1, h2 {
  color: #2c3e50;
}
a {
  color: #007acc;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
