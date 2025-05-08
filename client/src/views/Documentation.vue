<template>
    <div class="documentation">
        <h1>Documentation de l'API - Port de Plaisance de Russell</h1>
        <p>
        Cette API permet à la capitainerie du port de Russell de gérer les catways (appontements pour bateaux)
        et les réservations associées. Elle est privée et nécessite une authentification JWT.
        </p>
    
        <h2>Authentification</h2>
        <ul>
        <li><strong>POST</strong> /login &rarr; Connexion utilisateur (reçoit un token)</li>
        </ul>
    
        <h2>Utilisateurs</h2>
        <ul>
        <li><strong>POST</strong> /users &rarr; Créer un utilisateur</li>
        <li><strong>PUT</strong> /users/:id &rarr; Modifier un utilisateur</li>
        <li><strong>DELETE</strong> /users/:id &rarr; Supprimer un utilisateur</li>
        </ul>
    
        <h2>Catways</h2>
        <ul>
        <li><strong>GET</strong> /catways &rarr; Lister tous les catways</li>
        <li><strong>GET</strong> /catways/:id &rarr; Détails d'un catway</li>
        <li><strong>POST</strong> /catways &rarr; Créer un catway</li>
        <li><strong>PUT</strong> /catways/:id &rarr; Remplacer un catway</li>
        <li><strong>PATCH</strong> /catways/:id &rarr; Modifier l'état d'un catway</li>
        <li><strong>DELETE</strong> /catways/:id &rarr; Supprimer un catway</li>
        </ul>
    
        <h2>Réservations (liées aux catways)</h2>
        <ul>
        <li><strong>GET</strong> /catways/:id/reservations &rarr; Lister les réservations d'un catway</li>
        <li><strong>GET</strong> /catways/:id/reservations/:idReservation &rarr; Détails d'une réservation</li>
        <li><strong>POST</strong> /catways/:id/reservations &rarr; Créer une réservation</li>
        <li><strong>DELETE</strong> /catways/:id/reservations/:idReservation &rarr; Supprimer une réservation</li>
        </ul>
    </div>
    </template>
    
    <script setup>
    
    defineOptions({
        name: 'DashboardPage'
      });
    
    </script>
    
    <style scoped>
    .documentation {
    max-width: 800px;
    margin: 2rem auto;
    line-height: 1.7;
    }
    </style>