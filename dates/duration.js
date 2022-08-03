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
const durationRegexp = /P(?:(?<years>\d+)Y)?(?:(?<months>\d+)M)?(?:(?<weeks>\d+)W)?(?:(?<days>\d+)D)?(?:T(?:(?<hours>\d+)H)?(?:(?<minutes>\d+)M)?(?:(?<seconds>\d+)S)?)?/;
export function parseDuration(str) {
    const match = durationRegexp.exec(str);
    if (match == null) {
        return null;
    }
    const result = match.groups;
    for (const key in result) {
        if (result[key] !== undefined) {
            result[key] = parseInt(result[key]);
        }
        else {
            result[key] = 0;
        }
    }
    return result;
}
