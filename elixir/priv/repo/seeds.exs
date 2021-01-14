# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Homework.Repo.insert!(%Homework.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Homework.Repo
alias Homework.Users
alias Homework.Users.User
alias Homework.Merchants
alias Homework.Merchants.Merchant
alias Homework.Transactions.Transaction

%User{first_name: "User A", last_name: "name", dob: "1234"} |> Repo.insert!()
%User{first_name: "User B", last_name: "name", dob: "1234"} |> Repo.insert!()
%User{first_name: "User C", last_name: "name", dob: "1234"} |> Repo.insert!()
%User{first_name: "User D", last_name: "name", dob: "1234"} |> Repo.insert!()
%User{first_name: "User E", last_name: "name", dob: "1234"} |> Repo.insert!()

%Merchant{name: "Company A", description: "A Company"} |> Repo.insert!() 
%Merchant{name: "Company B", description: "A Company"} |> Repo.insert!() 
%Merchant{name: "Company C", description: "A Company"} |> Repo.insert!() 
%Merchant{name: "Company D", description: "A Company"} |> Repo.insert!() 
 
random_users = Users.get_random_users() 
user1 = Enum.at(random_users, 0)
user2 = Enum.at(random_users, 1)
user3 = Enum.at(random_users, 2)

random_merchants = Merchants.get_random_merchants()
merchant1 = Enum.at(random_merchants, 0)
merchant2 = Enum.at(random_merchants, 1)
merchant3 = Enum.at(random_merchants, 2)

%Transaction{amount: 1000, credit: true, debit: false, description: "buy some stuff", merchant_id: merchant1.id, user_id: user1.id} |> Repo.insert!()
%Transaction{amount: 2000, credit: true, debit: false, description: "get that thing", merchant_id: merchant2.id, user_id: user2.id} |> Repo.insert!()
%Transaction{amount: 3000, credit: false, debit: true, description: "went to that place", merchant_id: merchant3.id, user_id: user3.id} |> Repo.insert!()
%Transaction{amount: 400, credit: true, debit: false, description: "needed a thing", merchant_id: merchant1.id, user_id: user1.id} |> Repo.insert!()
%Transaction{amount: 12000, credit: false, debit: true, description: "bought that", merchant_id: merchant2.id, user_id: user2.id} |> Repo.insert!()
%Transaction{amount: 10000, credit: false, debit: true, description: "went there", merchant_id: merchant3.id, user_id: user3.id} |> Repo.insert!()
%Transaction{amount: 7000, credit: true, debit: false, description: "another purchase", merchant_id: merchant1.id, user_id: user1.id} |> Repo.insert!()
