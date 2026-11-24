# 🎓 Configurateur de Faluche Bressane

[![GitHub Pages](https://img.shields.io/badge/Demo-GitHub%20Pages-6C63FF?style=for-the-badge&logo=github)](https://zeldrag1.github.io/configurateur-faluche-bressane/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> Application web interactive permettant de composer, personnaliser et prévisualiser sa faluche selon le **code officiel faluchard** et les spécificités de la **tradition bressane**.

🔗 **Accéder au configurateur en ligne :** [https://zeldrag1.github.io/configurateur-faluche-bressane/](https://zeldrag1.github.io/configurateur-faluche-bressane/)

---

## 🌟 Fonctionnalités principales

### 1. 🎓 Choix exhaustif de filières & matières
- **Les Velours (Santé)** : Médecine (rouge), Pharmacie (vert), Dentaire (violet), Sage-Femme (fuchsia), Vétérinaire (bordeaux), Ostéopathie (bleu roy), PASS / LAS / Prépa Santé (marron), Études courtes (blanc).
- **Les Velours Paramedicaux (Rose)** : Kinésithérapie, Sciences infirmières, Orthophonie, Orthoptie, Ergothérapie, Psychomotriciens, Manipulateurs radio, Moniteurs éducateurs, Éducateurs spécialisés, Audioprothésistes.
- **Les Satin Jaune (Lettres & Sciences Humaines)** : Histoire, Géographie, Archéologie, Psychologie, Sociologie, Philosophie, Lettres classiques & modernes, LEA, LLCER, Musicologie, etc.
- **Les Satin Bleu (Arts & Architecture)** : Architecture, Beaux-arts, Audiovisuel, Théâtre, Musique, Couture/mode, Arts numériques.
- **Les Satin Marron (Prépas)** : BCPST, Khâgne/Hypokhâgne, Sup/Spé, ECS/ECE, Prépa Droit.
- **Les Satin Bicolores** : Écoles de commerce (rouge & vert), Écoles d'ingénieurs (bleu roi & noir), Notariat (rouge & noir), Sciences politiques (bleu & rouge).
- **Autres filières** : Droit (rouge), Sciences (violet), Éco-Gestion (orange), STAPS (vert foncé), AES (vert clair), BTS, IUT, etc.

### 2. 🔄 Gestion multi-filières
- Ajout de **filières secondaires** pour les parcours multiples ou réorientations.
- Deux modes au choix :
  - **En segments consécutifs** : division dynamique du fond du circulaire entre la filière principale et les filières secondaires.
  - **En ruban superposé** : ajout d'un ruban texturé (satin ou velours) posé par-dessus le circulaire.

### 3. 👒 Vue Velours vectorielle haute précision
- **Rubans de ville respectant la géométrie officielle** :
  - **Ville de baptême** : part du frontal et descend au centre, puis bifurque à **120° sur la gauche** (écusson de ville au centre de la faluche).
  - **Ville de naissance** : part du frontal **strictement en parallèle** au ruban de baptême, descend au centre, puis bifurque à **120° sur la droite** (écusson sur le ruban).
  - **Ville d'études** : part du centre vers le bord gauche à **90°**.
  - Possibilité de créer une ville personnalisée (nom et couleurs sur mesure).
- **Rubans d'association (bicolores, rayés, tressés)** :
  - Placement libre sur le velours en diagonale.
  - **Liserés de statut distinctifs** conformes à la tradition :
    - *Membre actif* (neutre)
    - *Bureau* (liseré bleu)
    - *Président* (liseré or)
    - *Doyen* (liseré blanc/argent)

### 4. 🧭 Vue Circulaire (Bandeau)
- Repères clairs : **Frontal**, **Occipital**, **Côté Officiel** (gauche du porteur) et **Côté Personnel** (droite du porteur).
- Placement intuitif des insignes, étoiles, diplômes, écussons et dates.

### 5. 📑 Gestionnaire de calques avancé (Layers Panel)
- **Sélection facile des éléments superposés** : liste exhaustive des éléments présents sur le velours et le circulaire.
- **Contrôle d'empilement (z-index)** :
  - *Monter d'un plan* ou *Descendre d'un plan*.
  - *Passer au tout premier plan* ou *Tout à l'arrière-plan*.
- **Gestion rapide** : Duplication en un clic et suppression.
- **Filtres par zone** : Tous les calques, Velours uniquement ou Circulaire uniquement.

### 6. ✦ Insignes & Écussons
- Catalogue d'insignes universitaires et de tradition (or et argent).
- Écussons de villes et régions de France au format SVG.
- Outil de **rotation 360° fluide** avec boutons d'accrochage rapide (0°, 45°, 90°, 135°, 180°, etc.).
- Ajout de textes personnalisés (surnom, date de baptême, initiales).

---

## 🛠️ Stack technique

- **Framework** : [React 18](https://react.dev/)
- **Build tool** : [Vite 5](https://vitejs.dev/)
- **Styles** : [Tailwind CSS 3](https://tailwindcss.com/) & CSS personnalisé
- **Composants interactifs** : [react-rnd](https://github.com/bokuweb/react-rnd) (drag-and-drop & resize)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Hébergement & CI/CD** : GitHub Pages via GitHub Actions

---

## 📂 Architecture des données

Les données sont réparties en modules clairs dans `src/data/` :
- `filieres.js` : Définition des filières, couleurs, matières (satin/velours) et emblèmes associés.
- `rubans.js` : Rubans d'associations bressanes, rubans de villes, statuts et styles de tissage.
- `insignes.js` : SVG et métadonnées des insignes dorés et argentés.
- `ecussons.js` : Armoiries et écussons vectoriels.
- `index.js` : Point d'entrée consolidé pour les imports de données.

---

## 💻 Démarrage en local

### Prérequis
- [Node.js](https://nodejs.org/) version 18 ou supérieure
- `npm` ou `pnpm`

### Installation
```bash
# Cloner le dépôt
git clone https://github.com/Zeldrag1/configurateur-faluche-bressane.git

# Se positionner dans le dossier
cd configurateur-faluche-bressane

# Installer les dépendances
npm install
```

### Lancer le serveur de développement
```bash
npm run dev
```
Ouvrez ensuite [http://localhost:5173/configurateur-faluche-bressane/](http://localhost:5173/configurateur-faluche-bressane/) dans votre navigateur.

### Compiler pour la production
```bash
npm run build
```
Les fichiers prêts à être hébergés seront générés dans le dossier `dist/`.

---

## 🚀 Déploiement sur GitHub Pages

Le déploiement est **100% automatique** grâce au workflow GitHub Actions inclus (`.github/workflows/deploy.yml`).

À chaque push sur la branche `main` :
1. Le code est récupéré et les dépendances installées avec `npm ci`.
2. Le projet est compilé via `npm run build`.
3. Le dossier `dist/` est déployé directement sur GitHub Pages.

Pour activer GitHub Pages sur votre dépôt :
1. Rendez-vous dans **Settings** > **Pages** de votre dépôt GitHub.
2. Sous **Build and deployment** > **Source**, sélectionnez **GitHub Actions**.

---

## 📜 Rappel de tradition falucharde

> La Faluche est la coiffe traditionnelle des étudiants de France, adoptée en 1888.  
> La tradition bressane se distingue notamment par ses règles spécifiques de disposition des rubans associatifs, de parrainage et de passage de témoin.

- **Côté circulaire gauche (Officiel)** : cursus universitaire, diplômes, filière, ville d'études, fonctions associatives.
- **Côté circulaire droit (Personnel)** : ville de naissance, passions, amour, vie étudiante, parrains/marraines.
- **Velours** : rubans de baptême, ruban de naissance, rubans d'associations et médailles.

---

## 📄 Licence

Projet libre et open-source sous licence MIT. Les contributions, suggestions et ajouts de nouveaux insignes ou écussons sont les bienvenus !
