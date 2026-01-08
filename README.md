# Astar

<img width="570" height="627" alt="Astar" src="https://github.com/user-attachments/assets/f1fed929-eb4b-4d37-986f-a6dba977b851" />

Når man ser på visualiseringen, er der forskellige farver, som hver har sin betydning. Det grønne felt markerer vores startpunkt, og det røde felt er målet, vi gerne vil nå. De sorte farver er mure, vi ikke kan gå igennem. Vi kan ikke bevæge os diagonalt heller. Kun op, ned, højre, venstre. Formålet er ikke blot at finde en vej, men at finde den korteste vej derhen.
Algoritmen arbejder ved at undersøge ét skridt ad gangen og altid vælge den retning, der indtil videre vurderes som den korteste. I starten udvælger den tre forskellige ruter, der ser lige lovende ud, hvilket får visualiseringen til at hoppe mellem de tre veje. Men pludselig stopper ruten i midten, mens ruterne til venstre og højre fortsætter.
Det, der sker, er, at algoritmen ved, at målet ligger i nederste højre hjørne. Da ruten i midten tvinges mod venstre af en mur, stiger dens afstand til målet. Algoritmen vurderer derfor, at det ikke længere giver mening at prioritere denne vej, så længe de andre ruter bevæger sig mere direkte mod målet.
Senere hen bliver den højre rute også nødt til at gå mod venstre som sætter den på pause. På dette tidspunkt ser den venstre rute ud til at have de bedste odds, men da algoritmen ikke kan se hele kortet men kun de firkanter der rundt om den, rammer den venstre rute en dead end. Nu bliver de to andre ruter aktive igen, da det nu giver mening at bevæge sig lidt væk fra målet for at komme uden om muren og hen til det røde.
Til sidst ser vi, at ruten til højre vinder. Da algoritmen når målet, markerer den den endelige rute med gul farve for at vise den mest optimale vej fra start til slut.
