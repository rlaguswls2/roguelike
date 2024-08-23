import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import {startGame} from "./game.js";

function displayMenu(currentPos) {
    switch (currentPos) {
        case 0:
            console.log(chalk.blue.bgWhite.bold('1.') + chalk.black.bgWhite.bold(' 새로운 게임 시작'));
            console.log(chalk.blue('2.') + chalk.white(' 업적 확인하기'));
            console.log(chalk.blue('3.') + chalk.white(' 옵션'));
            console.log(chalk.blue('4.') + chalk.white(' 종료'));
            break;
        case 1:
            console.log(chalk.blue('1.') + chalk.white(' 새로운 게임 시작'));
            console.log(chalk.blue.bgWhite.bold('2.') + chalk.black.bgWhite.bold(' 업적 확인하기'));
            console.log(chalk.blue('3.') + chalk.white(' 옵션'));
            console.log(chalk.blue('4.') + chalk.white(' 종료'));
            break;
        case 2:
            console.log(chalk.blue('1.') + chalk.white(' 새로운 게임 시작'));
            console.log(chalk.blue('2.') + chalk.white(' 업적 확인하기'));
            console.log(chalk.blue.bgWhite.bold('3.') + chalk.black.bgWhite.bold(' 옵션'));
            console.log(chalk.blue('4.') + chalk.white(' 종료'));
            break;
        case 3:
            console.log(chalk.blue('1.') + chalk.white(' 새로운 게임 시작'));
            console.log(chalk.blue('2.') + chalk.white(' 업적 확인하기'));
            console.log(chalk.blue('3.') + chalk.white(' 옵션'));
            console.log(chalk.blue.bgWhite.bold('4.') + chalk.black.bgWhite.bold(' 종료'));
            break;
        default:
            console.log(chalk.red('올바른 선택을 하세요.'));
            //handleUserInput(); // 유효하지 않은 입력일 경우 다시 입력 받음
    }
    
}


// 로비 화면을 출력하는 함수
function displayLobby(currentPos) {
    console.clear();
    
    // 타이틀 텍스트
    console.log(
        chalk.cyan(
            figlet.textSync('Legend of Bahama', {
                font: 'Standard',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        )
    );

    // 상단 경계선
    const line = chalk.magentaBright('='.repeat(50));
    console.log(line);

    // 게임 이름
    console.log(chalk.yellowBright.bold('CLI 게임에 오신것을 환영합니다!'));
    // 설명 텍스트
    console.log(chalk.green('옵션을 선택해주세요.'));
    console.log();

    // 옵션들
    displayMenu(currentPos)

    // 하단 경계선
    console.log(line);

    // 하단 설명
    console.log(chalk.gray('WASD로 메뉴를 이동하고 E로 선택하세요!'));
}

// 유저 입력을 받아 처리하는 함수
function handleUserInput(currentPos) {
    var key;
    var menuCount = 4;
    while(true) {
        key = readlineSync.keyIn('', {hideEchoBack: true, mask: '', limit: 'wasdeq'});
        if (key == 'w') {
            currentPos = (menuCount + currentPos - 1) % menuCount;
            displayLobby(currentPos);
        } else if (key == 's') {
            currentPos = (currentPos + 1) % menuCount;
            displayLobby(currentPos)
        } else if (key == 'e') {
            break;
        } else if (keyy == 'q') {
            process.kill();
        }
    }

    
    switch (currentPos) {
        case 0:
            console.log(chalk.green('게임을 시작합니다.'));
            // 여기에서 새로운 게임 시작 로직을 구현
            var result = startGame();
            return result
            break;
        case 1:
            console.log(chalk.yellow('구현 준비중입니다.. 게임을 시작하세요'));
            // 업적 확인하기 로직을 구현
            handleUserInput(currentPos);
            break;
        case 2:
            console.log(chalk.blue('구현 준비중입니다.. 게임을 시작하세요'));
            // 옵션 메뉴 로직을 구현
            handleUserInput(currentPos);
            break;
        case 3:
            console.log(chalk.red('게임을 종료합니다.'));
            return false
            break;
        default:
            console.log(chalk.red('올바른 선택을 하세요.'));
            handleUserInput(currentPos); // 유효하지 않은 입력일 경우 다시 입력 받음
    }
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