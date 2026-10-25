# PCS 7 I/O Analyzer v0.12

Verze 0.12 odděluje stav rozpoznání hardwaru od obsazenosti a stavu Cross-References.

## Značky rozpoznání ve stromu

- `✓ Ověřeno` znamená, že procesní modul byl rozpoznán podle katalogu MLFB.
- `Z Zařízení` označuje polní / sběrnicové zařízení (měniče Danfoss/Sinamics, motorové spouštěče 3RK1, SIMOCODE 3UF7, PA převodníky, regulátory, analyzátory sítě atd.). Nezkreslují běžné rezervy DI/DO/AI/AO, ale jejich komunikační adresy a kanály se párují s Cross-References.
- `~ Odvozeno` znamená, že typ nebo počet kanálů byl odvozen ze symbolů, parametrů nebo adresního rozsahu.
- `! Nerozpoznáno` znamená, že pod uzlem existuje procesní modul, který nebylo možné bezpečně popsat.
- `S Systémové` označuje systémový, diagnostický nebo neprocesní objekt (CPU, napájecí zdroj, rack, server modul, Scalance switch).

U RIO, IO systému, stanice a projektu se zobrazuje nejhorší stav všech podřízených modulů. Pokud RIO obsahuje jeden nerozpoznaný modul, RIO je označené červeným vykřičníkem.

Po najetí na značku se zobrazí souhrn počtu ověřených, odvozených, nerozpoznaných a systémových modulů.

## Oddělení upozornění

Stav rozpoznání HW je nyní nezávislý na programovém využití kanálů. Pojmenovaný kanál bez Cross-Reference má samostatnou fialovou značku `P`, takže již není zaměňován za chybu parseru.

V detailu objektu je nová položka **Rozpoznání HW** s podrobným souhrnem. Dashboard a **Kontrola dat** rovněž zobrazují počty `verified`, `probable`, `unknown` a `system`.
