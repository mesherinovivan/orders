orders
django rest framework learn

Тестовое задание
Написать на Python программу хранения и редактирования списка заказов.

Функционал:

Вывести список заказов за указанный период

Добавить заказ

Удалить заказ

Изменить заказ

Требования:

Хранить заказы в реляционной базе данных.

Тип базы данных должен легко меняется. Например, если изначально данные хранились в MySQL, то программу должно быть легко переделать на MS SQL, заменив всего одну строку кода, а в идеале вообще не меняя код, только выполнив настройки.

Программа должна иметь WEB-интерфейс.

К программе должна прилагаться инструкция как ее развернуть/запустить.

Атрибуты заказа: номер, дата, сумма, контрагент, текст заказа.

# INSTALL

git clone https://github.com/mesherinovivan/orders.git 

cd orders 

virtualenv .env -p=python3.6 

source .env/bin/activate 

pip install -r requirements.txt

./manage.py migrate

./manage.py loaddata data.json

# Start
./manage.py runserver



