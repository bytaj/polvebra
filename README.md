[TOC]
# polvebra
Application to manage how do you expense your money

##Introduction
Polvebra is a free use mobile app. The objetive of this apps borns whit my own need to manage my money. It was my first month working I saw that I expense my money without control. 
I'm also an enthusiastic of technology and I want to learn more about. So I thought it could be a nice chance to start new technologys.

The app is absolutly free, just for fun and learning (English too documentation in English, sorry for the mistakes), and posted in GitHub as my own portfolio. Also I want three more things posting this here. In first place, I'll try to document it the better I can, so if somebody needs it in the futher to learn or take some code, you can (If you take something, please reference me). The second one if somebody wants to colaborate, he can, just talk me. And the last thing is if somebody see an error, in the code, the conception, the software engineering... Please talk me.

All donations to help me are welcome. With donations I'll rent better servers our is a way to monetise all the time in this project and a motivation for other free projects.

Thank you so much reading this. I hope you like the project.

##Documentation
While the project is in develop, the documentation will be incomplete.

###Informal description of the problem
I will take about the concepts that will appear in the application and finally what its the idea of the display.

####Concepts
#####Account
The account how you view an account. For example you can have several accounts in differents or the same banks. Thas will represent this concept. The default account will be the cash account. That will represent the money in your pocket. At the moment, any account has the same values as the name, the current amount, the transactions you did in there...

#####Amount
This concept will talk about the money you have in each account and in all the accounts. There will be to types of amount. Your amount, its will be the money you have right now an the other the net amount. You will can put an outlay as unpaid. In this case, the net amount will show you the money you would have if you had paid that.

#####Transaction

This concept represents the movement of money. All the transactions have commons values. One is the the name, the money of the transaction, the date, the value of is paid, the tag... 
There are two differents types of transactions:
- Deposit: It's when the money is into your account.
- Outlay: It represents the expense of the money.

You can also define a periodic transaction. For example, you can put in there your salary. With that you can automatice the creation of transactions, in this case, deposits. You can put when you start with this periodic transactions (And/Or how many did you had before), what is the period you have this transaction, when it finish (or not)...

Also you can do a transer between accounts, that wont compute as expense/income. That will manage for example, if you withdraw, it won't compute.

#####Tag
Every transaction will be classified in Tags. If you don't specify any, this will be classified in a default Tag. This tags represents the nature of the transaction. You can create subtags in a tag, for example, if you buy a keyboard, the tag could be Peripheral wihtch one is son of Hardware witch is son of Computer.

That will be a piece very importat for the analysis.

####Functionality
The first one it's can manipute all the elements previusly declared, the famous CRUD, create, remove update and delete.

The other one is the analysis of the data. This part I think it could be the most valuable. In this one you can search (For an account, several or all of them) the transaction values. The searcher will let you filter by date and/or tag. For example you can search how many did you spend going out dinner, in one of the several supermarket even in what products. That could give you a complete view of all the ways do you expense your money, view your main ways of incomes.. This output will be plots in differents graphs.


####App display
This app will try a find a way to manage the movement of your money. This will be valid for a single person to manage his salary or a small company. 

The first screen the user will have is an login/register page, where the user will have to login with his credentials or create an account. In the future could be implemented login with Google or Facebook.

Once you are you are logged you will have an main dashboard. In this dashboard you will see your amount you have and your "net" amount (I will explain this concept later). You will also have the amounts in all your virtual accounts (Banks accounts, cash, etc.) And a button to create a transacion.

You will have in the left part of the screen a main menu. This menu will show the next things:
- **Accounts**: Opens a new screen with more details of yours accounts.
- **Transactions**: Opens a new screen with all your transactions in all accounts. This will be able to be sorted by date or name, by  default, the lastest day.

###Domain

##Installations 
In this section I will take about the places you could download all the software for work with this repository. I will post all the things I thing you could need for the correct work.

###Documentation 
- **Documentation**: For documentation I'm writing this markdown file. I edited this here https://pandao.github.io/editor.md/en.html#H4%20header . This is an online plataform to write your Markdown files and see the preview at the moment. You can use your prefer text editor. I used this because is more cozy to me.

- **UML**: For the UML Desings I use UML Designer. Currently I used 9.0.0 version, I think is complatible with others, but I used it. The download link is http://www.umldesigner.org/download/ . I think if you have a eclipse version alredy, you can use it with a plugin, but I'm not sure. This need a jdk version in your computer. This link is multiplataform.

###Backend
- **Mongodb**: The current DB is MongoDB. This is an multiplataform NoSQL database. I used 4.2.7 version, I dont know if it works with other, I think so. 
The version I downloaded (for windows) is that https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2012plus-4.2.7-signed.msi/download . For general download you can go here: https://www.mongodb.com/download-center/community

- **Nodejs (With Typescript)**:

- **VSCode**:

###Frontend
- **Flutter**:

- **Dart**:

- **Android Studio**:
