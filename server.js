import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import {startGame} from "./game.js";
import {AchievementManager} from './achievements.js';
const achievementManager = new AchievementManager();

function displayAchievementsMenu() {
    let currentPos = 0;
    const menuCount = achievementManager.achievements.length + 1; // 업적 개수 + '이전으로' 버튼

    achievementManager.displayAchievements(currentPos);

    while (true) {
        const key = readlineSync.keyIn('', {hideEchoBack: true, mask: '', limit: 'wse'});

        if (key === 'w') {
            currentPos = (menuCount + currentPos - 1) % menuCount;
        } else if (key === 's') {
            currentPos = (currentPos + 1) % menuCount;
        } else if (key === 'e' && currentPos === achievementManager.achievements.length) {
            return; // 메인 메뉴로 돌아가기
        }

        achievementManager.displayAchievements(currentPos);
    }
}


function displayMenu(currentPos) {
    const menuItems = [
        '새로운 게임 시작',
        '업적 확인하기',
        '옵션',
        '종료'
    ];

    menuItems.forEach((item, index) => {
        let formattedItem;
        if (index === currentPos) {
            formattedItem = chalk.blue.bgWhite.bold(`${index + 1}.`) + chalk.black.bgWhite.bold(` ${item}`);
        } else {
            formattedItem = chalk.blue(`${index + 1}.`) + chalk.white(` ${item}`);
        }
        console.log(formattedItem);
    });
}


// 로비 화면을 출력하는 함수
function displayLobby(currentPos) {
    console.clear();
    console.log(
        chalk.cyan(
            figlet.textSync('Legend of Bahama', {
                font: 'Standard',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        )
    );

    const line = chalk.magentaBright('='.repeat(50));
    console.log(line);
    console.log(chalk.yellowBright.bold('CLI 게임에 오신것을 환영합니다!'));
    console.log(chalk.green('옵션을 선택해주세요.'));
    console.log();

    displayMenu(currentPos)

    console.log(line);
    console.log(chalk.gray('WASD로 메뉴를 이동하고 E로 선택하세요!(q로 중간에 종료할 수 있습니다.)'));
}

// 유저 입력을 받아 처리하는 함수
function handleUserInput(currentPos) {
    var menuCount = 4;
    displayLobby(currentPos);

    while(true) {
        const key = readlineSync.keyIn('', {hideEchoBack: true, mask: '', limit: 'wasdeq'});
        if (key == 'w') {
            currentPos = (menuCount + currentPos - 1) % menuCount;
            displayLobby(currentPos);
        } else if (key == 's') {
            currentPos = (currentPos + 1) % menuCount;
            displayLobby(currentPos)
        } else if (key == 'e') {
            break;
        } else if (key == 'q') {
            return false;
        }
    }


    switch (currentPos) {
        case 0:
            return startGame(achievementManager)
        case 1:
            displayAchievementsMenu();
            break;
        case 2:
            console.log(chalk.blue('구현 준비중입니다.. 게임을 시작하세요'));
            break;
        case 3:
            console.log(chalk.red('게임을 종료합니다.'));
            return false
    }
    return handleUserInput(currentPos);
}

// 게임 시작 함수
function start() {
    var restart = true;
    while(restart) {
        displayLobby(0);
        restart = handleUserInput(0);
    }
}

// 게임 실행
start();