<div align="center">

# 🤖 AzulBOT

### 👋 Un bot Discord qui accueille et accompagne les membres de ton serveur

<div align="center">
    <a href="https://discord.com/users/689890476811354242">
        <img src="https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white"/>
    </a>
    <a href="https://x.com/matgordfr">
        <img src="https://img.shields.io/badge/X-%23000000.svg?style=for-the-badge&logo=X&logoColor=white"/>
    </a>
    <a href="https://github.com/MatgordFR">
        <img src="https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"/>
    </a>
</div>

</div>

---

## 🌟 Présentation

**AzulBOT** est un bot Discord qui génère automatiquement des images personnalisées lors des arrivées et départs de membres. Il affiche l'avatar du membre, son pseudo et le compteur de membres directement sur l'image.

---

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| 🖼️ **Image de bienvenue** | Génère une image avec l'avatar et le pseudo du nouveau membre |
| 👋 **Image de départ** | Génère une image lors du départ d'un membre |
| 📩 **Embed de redémarrage** | Envoie un message embed dans un salon de logs au démarrage |
| 🎭 **Statut rotatif** | Affiche un statut Discord qui change toutes les 20 secondes |
| ⚙️ **Config centralisée** | Toute la config dans un seul fichier `config.json` |

---

## 🗂️ Structure du projet

```
📁 AzulBOT/
├── 📄 index.js                  ← Point d'entrée, chargement des events
├── 🔧 config.json               ← Token, couleur et IDs des salons
├── 📦 package.json              ← Dépendances et script de démarrage
├── 📖 README.md                 ← Ce fichier
├── 📁 events/
│   ├── ✅ ready.js              ← Embed de démarrage + rotation du statut
│   ├── 👋 guildMemberAdd.js     ← Image de bienvenue
│   └── 🚪 guildMemberRemove.js  ← Image de départ
├── 📁 utils/
│   └── 🎨 canvas.js            ← Génération des images (partagé)
├── 📁 image/
│   ├── 🖼️ Bienvenue.png         ← Fond de l'image de bienvenue
│   └── 🖼️ Depart.png            ← Fond de l'image de départ
└── 📁 preview/
    ├── 🖼️ bienvenue-image.png   ← Aperçu de l'image de bienvenue
    └── 🖼️ depart-image.png      ← Aperçu de l'image de départ
```

---

## 📦 Installation

### 1️⃣ Prérequis

Avant de commencer, assure-toi d'avoir :

- ✅ [Node.js v18+](https://nodejs.org/) installé
- ✅ Un bot Discord créé sur le [Discord Developer Portal](https://discord.com/developers/applications)
- ✅ L'intent **Server Members** activé dans le portail développeur

> ⚠️ **Intent privilégié requis** — dans le Discord Developer Portal, active **Server Members Intent** sous *Bot → Privileged Gateway Intents*, sinon le bot ne recevra pas les événements d'arrivée/départ.

---

### 2️⃣ Installer les dépendances

```bash
npm install
```

Cela installe automatiquement :

| Package | Rôle |
|---|---|
| `discord.js` | Librairie principale pour interagir avec l'API Discord |
| `canvas` | Génération des images de bienvenue et de départ |

---

## 📸 Aperçu

| Bienvenue | Départ |
|---|---|
| ![Bienvenue](preview/bienvenue-image.png) | ![Départ](preview/depart-image.png) |

---

## 🔧 Configuration

Crée un fichier `config.json` et remplis avec tes propres valeurs :

```json
{
  "token": "TON_TOKEN_DISCORD",
  "color_principal": "#0099ff",
  "Salon_Logs_Demarrage": "ID_DU_SALON_LOGS",
  "Salon_Bienvenue": "ID_DU_SALON_BIENVENUE",
  "Salon_Depart": "ID_DU_SALON_DEPART"
}
```

> ⚠️ **Ne partage jamais ton `token` publiquement !** Le fichier `config.json` est déjà dans le `.gitignore`.

| Clé | Description |
|---|---|
| `token` | Token de ton bot Discord |
| `color_principal` | Couleur principale des embeds (format hex) |
| `Salon_Logs_Demarrage` | ID du salon où envoyer l'embed de démarrage |
| `Salon_Bienvenue` | ID du salon où envoyer l'image de bienvenue |
| `Salon_Depart` | ID du salon où envoyer l'image de départ |

---

## 🖼️ Images personnalisées

Place tes propres images de fond dans le dossier `image/` :

| Fichier | Taille recommandée | Usage |
|---|---|---|
| `Bienvenue.png` | 1024 × 500 px | Fond de l'image de bienvenue |
| `Depart.png` | 1024 × 500 px | Fond de l'image de départ |

> 💡 L'avatar du membre est affiché dans un cercle centré en haut de l'image, son pseudo et le compteur de membres sont écrits en dessous.

---

## ▶️ Lancer le bot

```bash
npm start
```

Le bot va :
1. ✅ Vérifier que le token est présent dans `config.json`
2. 🔗 Se connecter à Discord
3. 📩 Envoyer un embed de démarrage dans le salon de logs
4. 🎭 Démarrer la rotation du statut

---

## ⚠️ Dépannage

| Problème | Solution |
|---|---|
| `Token Discord manquant` | Vérifie que `config.json` contient bien ton token |
| Pas d'image de bienvenue | Vérifie que `Salon_Bienvenue` est le bon ID de salon |
| `Unsupported image type` | Vérifie ta connexion internet (chargement de l'avatar) |
| `Cannot find module` | Relance `npm install` |
| Pas d'événements membre | Active **Server Members Intent** dans le Developer Portal |

---

<div align="center">

Fait avec ❤️ By: MatgordFR © 2026

</div>
