# sorting
Pure JavaScript application that shows how sorting algorithms work.

Vytvořeno v lednu 2018 jako zápočtová práce do předmětu Programování na MFF UK. Použité technologie jsou HTML, CSS, JS ES6, jQuery.

# Návod k použití
Uživatel si nejprve v menu vybere požadovaný algoritmus, zvolí prvky, které se budou řadit, a po kliknutí na start se spustí řazení. To je možno ovládat klávesnicí, nebo tlačítky v pravém horním rohu. Dole je posuvník celého řazení, který lze přesouvat a tak se dostat do různých částí řazení. Posuvníkem vpravo nahoře se nastavuje rychlost. Zpět do menu se lze dostat křížkem v pravém horním rohu.

# Struktura
## Board
Třída *Board* zaštiťuje jednu instanci aplikace. Stará se o GUI a volá metody jiných tříd.

## Animator
Jednoduchá třída řešící animace proměnných. Voláním metody `animate(callback)`, bude pravidelně volat `callback` a navyšovat hodnotu parametru.

## Actor
Abstraktní třída zastupující všechny prvky, které se vyskytují v prezentaci a lze je nějak animovat (proto ten název jako herec). Každý *Actor* má svůj vnitřní stav, což je objekt převážně číselných hodnot, které se můžou v průběhu měnit. Ke změně stavu slouží metoda `setState()`, která využívá *Animator* a ve skutečnosti mění vnitřní stav postupně. Každý *Actor* tedy po zavolání `setState()` postupně přechází do jiného stavu. Metoda `_redraw()` aktualizuje DOM podle vnitřního stavu objektu kdykoli se změní.

### NumberActor
Zatím jediný užitečný *Actor* v aplikaci. Vykreslí kolečko s číslem. Vnitřním stavem je barva, velikost, orámování, pozice, takže všechny tyto vlastnosti lze pomocí setState měnit a tedy i animovat.

*Dalšími Actory mohou mýt třeba šipky ukazující na jednotlivá čísla, čáry propojující dva prvky, nebo třeba tabulky pro složitější algoritmy.*

### BackgroudActor
Stará se o animaci pozadí, jeho vnitřním stavem je barevná paleta, proto lze v průběhu aplikace měnit odstín pozadí. Na rozdíl od *NumberActor* je v celé aplikaci jen jediná instance.

### TextHelpActor
Další *Actor* s jedinou instancí zobrazující text na spodku obrazovky.

## Presenter
Při vytváření prezentace (tedy animace třídění) se přímo nepracuje s *Actory*, ale jen s jejich stavy, které se později budou přidělovat *Actorům* na základě daného snímku. To právě dělá tato třída.

Metoda `addSlide()` umožňuje přidat do vnitřní paměti všechny stavy Actorů, které byly vytvořeny.

`goToSlide` pak daný slide vyvolá tak, že všem Actorům, jež jsou ve skutečnosti uloženi v instanci třídy *Algorithm*, nastaví daný stav. Všichni Acoři se tedy začnou překreslovat podle daného snímku.

Metoda `initAlgorithm(algorithm, numbers_to_sort)` vytvoří instanci třídy *Algorithm* a ta právě vytvoří danou prezentaci s pomocí výše zmíněných metod.

## Algorithm
Abstraktní třída reprezentující konkrétní algoritmus. Po zavolání metody `prepare()`, si instance vytvoří *Actory*, které si uloží k sobě a mění pouze jejich stavy, které předává již zmíněnému *Presenteru*.

Aktuálně jsou implementovány tři algoritmy.

## MainMenu
Třída starající se o hlavní menu, tedy výběr algoritmu, výběr konkrétních prvků atp. Komunikuje s *Boardem*.

