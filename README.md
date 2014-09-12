#[Yeoman](http://yeoman.io/)

##Wat is Yeoman?

Yeoman helps you kickstart new projects, prescribing best practices and tools to help you stay productive.

To do so, we provide a generator ecosystem. A generator is basically a plugin that can be run with the `yo` command to scaffold complete projects or useful parts.

Through our official Generators, we promote the "Yeoman workflow". This workflow is a robust and opinionated client-side stack, comprising tools and frameworks that can help developers quickly build beautiful web applications. We take care of providing everything needed to get started without any of the normal headaches associated with a manual setup.

With a modular architecture that can scale out of the box, we leverage the success and lessons learned from several open-source communities to ensure the stack developers use is as intelligent as possible.

As firm believers in good documentation and well thought out build processes, Yeoman includes support for linting, testing, minification and much more, so developers can focus on solutions rather than worrying about the little things.

##Tools

The Yeoman workflow is comprised of three types of tools for improving your productivity and satisfaction when building a web app: the scaffolding tool (yo), the build tool (Grunt, Gulp, etc) and the package manager (like Bower and npm).

##Gegenereerde projecten

Ik heb 4 projecten gegenereerd, 3 AgnularJS projecten en 1 openui5 project.
Openui5:

-   openui5generated: Project alleen aangemaakt met de generator

Angular:

-   yeomangenerated: Project alleen aangemaakt met de generator
-   [mytodo](http://yeoman.io/codelab.html): Aangemaakt met de generator - todo appje icm localstorage
-   ang-news: Aangemaakt met de generator - men kan nieuws links posten icm firebase

##Randvoorwaarde

-   node/npm >= v1.2.10
-   git
-   commandline gebruiken
-   Installeer yeoman: `npm install -g yo`
    -   Als je NPM versie hoger is dan 1.2.10, dan wordt grunt en bower automatisch geinstalleerd, anders moet men deze handmatig installeren.

##De bovenstaande projecten uitproberen

-   Clone dit project
-   Zodra alles correct geinstalleerd/gecloned is: cd naar de juiste directory en run de volgende commands `npm install` en `bower install`
-   Server runnen: `grunt serve`

##Zelf een project genereren

-   Eerst heb je de juiste generator nodig, deze kan je zoeken via `yo` command of via de [website](http://yeoman.io/generators/) zelf.
-   Zodra je deze hebt gevonden installeer je deze: `npm install -g generator-angular`
-   Maak een nieuwe directory aan en ga er naar toe: `mkdir projectnaam && cd projectnaam`
-   Run `yo angular appnaam`
-   Beantwoord de vragen
-   Preview jou project: `grunt serve`