#Giełda zleceń transportowych

##Role:
    - klient (zleceniodawca)
    - przewoźnik (zleceniobiorca)
    - administrator

##Ficzursy

* Klient dodaje propozycje zlecenia przewozu. Podaje parametry (waga, skąd, dokąd, ramy czasowe, ładunek).
* Przewoźnik przegląda zlecenia i wybiera najbardziej mu odpowiadające po czym wysyła klientowi oferte cenową.
* Jeśli obie strony zgodzą się na warunki zlecenie zostaje przypisane przewoźnikowi.
* Integracja z google maps api.
* Trzy panele użytkownika: klient, przedsiębiorca, kierowca.
* Kierowca aktualizuje status swojego zlecenia (w trasie, dostarczone).

##poprawa

* data początkowa, końcowa
* wszystkie złożone oferty
* odrzucanie ofert
* zrealizowane zlecenia (przewoźnik)
* przewoźnik szuka kierowcy zanim wyśle ofertę
* query builder - flirtowanie
* odległość trzymana w bazie