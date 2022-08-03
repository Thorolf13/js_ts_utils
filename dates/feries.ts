/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <thorolf13@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.
 * ----------------------------------------------------------------------------
 * "LICENCE BEERWARE" (Révision 42):
 * <thorolf13@gmail.com> a créé ce fichier. Tant que vous conservez cet avertissement,
 * vous pouvez faire ce que vous voulez de ce truc. Si on se rencontre un jour et
 * que vous pensez que ce truc vaut le coup, vous pouvez me payer une bière en
 * retour.
 * ----------------------------------------------------------------------------
 */

function isSameDay (date1: Date | number, date2: Date | number): boolean {
  date1 = new Date(date1);
  date2 = new Date(date2);

  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}

function addDays (date: Date | number, nb: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + nb);
  return newDate;
}

function calcJoursFeries (annee: number): Date[] {
  // jours fixes
  const JourAn = new Date(annee, 0, 1, 12);
  const FeteTravail = new Date(annee, 4, 1, 12);
  const Victoire1945 = new Date(annee, 4, 8, 12);
  const FeteNationale = new Date(annee, 6, 14, 12);
  const Assomption = new Date(annee, 7, 15, 12);
  const Toussaint = new Date(annee, 10, 1, 12);
  const Armistice = new Date(annee, 10, 11, 12);
  const Noel = new Date(annee, 11, 25, 12);

  // calcul paques
  const G = annee % 19;
  const C = Math.floor(annee / 100);
  const H = (C - Math.floor(C / 4) - Math.floor((8 * C + 13) / 25) + 19 * G + 15) % 30;
  const I = H - Math.floor(H / 28) * (1 - Math.floor(H / 28) * Math.floor(29 / (H + 1)) * Math.floor((21 - G) / 11));
  const J = (annee * 1 + Math.floor(annee / 4) + I + 2 - C + Math.floor(C / 4)) % 7;
  const L = I - J;
  const MoisPaques = 3 + Math.floor((L + 40) / 44);
  const JourPaques = L + 28 - 31 * Math.floor(MoisPaques / 4);

  // paques et jours relatifs
  const Paques = new Date(annee, MoisPaques - 1, JourPaques, 12);
  const LundiPaques = new Date(annee, MoisPaques - 1, JourPaques + 1, 12);
  const Ascension = new Date(annee, MoisPaques - 1, JourPaques + 39, 12);
  const Pentecote = new Date(annee, MoisPaques - 1, JourPaques + 49, 12);
  const LundiPentecote = new Date(annee, MoisPaques - 1, JourPaques + 50, 12);
  return [JourAn, Paques, LundiPaques, FeteTravail, Victoire1945, Ascension, Pentecote, LundiPentecote, FeteNationale, Assomption, Toussaint, Armistice, Noel];
}
const joursFeriesParAnnee: { [key: number]: Date[] } = {};

export function getJoursFeries (annee: number): Date[] {
  if (joursFeriesParAnnee[annee] === undefined) {
    joursFeriesParAnnee[annee] = calcJoursFeries(annee);
  }
  return joursFeriesParAnnee[annee];
}

/**
 * @param {Date | number} date
 * @return {boolean} true si date est un jour férié
 */
export function isJourFerie (date: Date | number): boolean {
  date = new Date(date);
  return !!getJoursFeries(date.getFullYear()).some(d => isSameDay(d, date));
}

/**
 * @param {Date | number} date
 * @return {boolean} true si date est un jour ouvrable (lundi-samedi - fériés)
 */
export function isJourOuvrable (date: Date | number): boolean {
  date = new Date(date);
  return !isJourFerie(date) && date.getDay() !== 0;
}

/**
 * @param {Date | number} date
 * @return {boolean} true si date est un jour ouvré (lundi-vendredi - fériés)
 */
export function isJourOuvre (date: Date | number): boolean {
  date = new Date(date);
  return !isJourFerie(date) && date.getDay() !== 0 && date.getDay() !== 6;
}

/**
 * @param {Date | number} date
 * @param {number} nb nombre de jours à ajouter
 * @return {Date} date + nb jours ouvrables
 */
export function addJourOuvrable (date: Date | number, nb: number): Date {
  let newDate = new Date(date);

  const sub = nb < 0;
  nb = Math.abs(nb);

  while (nb > 0) {
    newDate = addDays(newDate, sub ? -1 : 1);
    if (isJourOuvrable(newDate)) {
      nb--;
    }
  }

  return newDate;
}

/**
 * @param {Date | number} date
 * @param {number} nb nombre de jours à ajouter
 * @return {Date} date + nb jours ouvré
 */
export function addJourOuvre (date: Date | number, nb: number): Date {
  let newDate = new Date(date);

  const sub = nb < 0;
  nb = Math.abs(nb);

  while (nb > 0) {
    newDate = addDays(newDate, sub ? -1 : 1);
    if (isJourOuvre(newDate)) {
      nb--;
    }
  }

  return newDate;
}
