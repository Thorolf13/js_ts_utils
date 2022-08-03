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

import { isPast, isValid } from 'date-fns';

// eslint-disable-next-line @typescript-eslint/ban-types
function executeAtTime(callback, time) {
    if (typeof time === 'number') {
        time = new Date(time);
    }
    if (!isValid(time) || isPast(time)) {
        // eslint-disable-next-line no-console
        console.warn(`[executeAtTime] La date ${time} est ` + (isPast(time) ? 'déjà passée' : 'invalide'));
        return () => { };
    }
    const now = new Date();
    const nbMilisecondsToTime = time.getTime() - now.getTime();
    const timeout = setTimeout(callback, nbMilisecondsToTime);
    return function () {
        clearTimeout(timeout);
    };
}
export { executeAtTime };
