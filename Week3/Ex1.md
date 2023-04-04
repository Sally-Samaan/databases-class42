## Normalization
>>
```
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
| member_id | member_name   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
|         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1, C2    | Curry, Cake      |
|         2 | Ben           | 24 Hudson lane | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         3 | Cristina      | 516 6th Ave    | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         4 | Dan           | 89 John St     | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         1 | Amit          | 325 Max park   | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         3 | Cristina      | 516 6th Ave    | D00001004 | Mar 25 '20  | B04        | Mama's Kitchen    | F1, M1    | Falafal, Mousse  |
|         5 | Gabor         | 54 Vivaldi St  | D00001005 | Mar 26 '20  | B05        | Hungry Hungary    | G1, P2    | Goulash, Pasca   |
|         6 | Hema          | 9 Peter St     | D00001003 | 01-04-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
```
>> What columns violate 1NF?    food_code // AND // food_description // dinner_date

>>What entities do you recognize that could be extracted?  
>>>>member_id: A unique identifier for each member.
>>>>member_name: The name of each member.
>>>>member_address: The address of each member.
>>>>dinner_id: A unique identifier for each dinner.
>>>>dinner_date: The date of each dinner.
>>>>venue_code: A code representing the venue where each dinner was held.
>>>>venue_description: A description of the venue where each dinner was held.
>>>>food_code: A code representing the food served at each dinner.
>>>>food_description: A description of the food served at each dinner.

>>Name all the tables and columns that would make a 3NF compliant solution.
>>>>Table: members
>>>>>member_id (primary key)
>>>>>member_name
>>>>>member_address

>>>>Table: dinners
>>>>>dinner_id (primary key)
>>>>>dinner_date
>>>>>venue_code (foreign key references venues.venue_code)

>>>>Table: venues
>>>>>venue_code (primary key)
>>>>>venue_description

>>>>Table: food_items
>>>>>food_code (primary key)
>>>>>food_description

>>>>Table: dinner_food_items
>>>>>dinner_id (foreign key references dinners.dinner_id)
>>>>>food_code (foreign key references food_items.food_code)
