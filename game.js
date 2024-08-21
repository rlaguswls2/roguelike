import chalk from 'chalk';
import readlineSync from 'readline-sync';

class Player {
  constructor() {
    this.hp = 100;
    this.strength = 10; // 최소 공격력
  }

  attack(monster) {
    monster.hp -= this.strength;
    return monster;
  }
}

class Monster {
  constructor() {
    this.hp = 100;
    this.strength = 8; // 최소공격력
  }

  attack(player) {
    player.hp -= this.strength;
  }
}

function displayMenu(currentPos) {
  switch (currentPos) {
      case 0:
          process.stdout.write(chalk.blue.bgWhite.bold('1.') + chalk.black.bgWhite.bold(' 일반공격'))
          process.stdout.write(' ')
          process.stdout.write(chalk.green('2.') + chalk.green(' 연속공격'))
          process.stdout.write(' ')
          process.stdout.write(chalk.green('3.') + chalk.green(' 방어한다'))
          process.stdout.write(' ')
          process.stdout.write(chalk.green('4.') + chalk.green(' 도망친다'))
          console.log('');
          break;
      case 1:
          process.stdout.write(chalk.green('1.') + chalk.green(' 일반공격'))
          process.stdout.write(' ')
          process.stdout.write(chalk.blue.bgWhite.bold('2.') + chalk.black.bgWhite.bold(' 연속공격'))
          process.stdout.write(' ')
          process.stdout.write(chalk.green('3.') + chalk.green(' 방어한다'))
          process.stdout.write(' ')
          process.stdout.write(chalk.green('4.') + chalk.green(' 도망친다'))
          console.log('');
          break;
      case 2:
          process.stdout.write(chalk.green('1.') + chalk.green(' 일반공격'))
          process.stdout.write(' ')
          process.stdout.write(chalk.green('2.') + chalk.green(' 연속공격'))
          process.stdout.write(' ')
          process.stdout.write(chalk.blue.bgWhite.bold('3.') + chalk.black.bgWhite.bold(' 방어한다'))
          process.stdout.write(' ')
          process.stdout.write(chalk.green('4.') + chalk.green(' 도망친다'))
          console.log('');
          break;
      case 3:
          process.stdout.write(chalk.green('1.') + chalk.green(' 일반공격'))
          process.stdout.write(' ')
          process.stdout.write(chalk.green('2.') + chalk.green(' 연속공격'))
          process.stdout.write(' ')
          process.stdout.write(chalk.green('3.') + chalk.green(' 방어한다'))
          process.stdout.write(' ')
          process.stdout.write(chalk.blue.bgWhite.bold('4.') + chalk.black.bgWhite.bold(' 도망친다'))
          console.log('');
          break;
      default:
          console.log('행동을 선택하세요')
          //handleUserInput(); // 유효하지 않은 입력일 경우 다시 입력 받음
  }
  
}

function displayStatus(stage, player, monster) {
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${stage} `) +
    chalk.blueBright(
      `| 플레이어 정보 | HP ${player.hp} ATK ${player.strength}`,
    ) +
    chalk.redBright(
      `| 몬스터 정보 | HP ${monster.hp} ATK ${monster.strength}`,
    ),
  );
  console.log(chalk.magentaBright(`=====================\n`));
}

const battle = async (stage, player, monster) => {
  let logs = [];
  var currentPos = 0
  var selectedPos = 4
  var menuCount = 4
  var key;

  console.clear();
  
  while(player.hp > 0) {
    
    displayStatus(stage, player, monster)
    console.log(player.hp)
    switch (selectedPos) {
      case 0:
          logs.push(chalk.red(`[${currentPos+1}] 일반 공격을 했습니다!]`));
          monster.attack(player);
          logs.forEach((log) => console.log(log));
          break;
      case 1:
          logs.push(chalk.red(`[${currentPos+1}] 연속 공격을 했습니다!]`));
          monster.attack(player);
          logs.forEach((log) => console.log(log));
          break;
      case 2:
          logs.push(chalk.red(`[${currentPos+1}] 방어를 선택 했습니다!]`));
          monster.attack(player);
          logs.forEach((log) => console.log(log));
          break;
      case 3:
          logs.push(chalk.red(`[${currentPos+1}] 도망을 선택 했습니다!]`));
          monster.attack(player);
          logs.forEach((log) => console.log(log));
          break;
      default:
          logs.forEach((log) => console.log(log));
          //handleUserInput(); // 유효하지 않은 입력일 경우 다시 입력 받음
          //currentPos = handleUserInput(currentPos, stage, player, monster, logs);
    }

    displayMenu(currentPos)

  
    // 선택 전까지 방향키 입력 받기 (A - D // E)
    while(true) {
        key = readlineSync.keyIn('', {hideEchoBack: true, mask: '', limit: 'wasde'});
        if (key == 'a') {
            currentPos = (menuCount + currentPos - 1) % menuCount;
        } else if (key == 'd') {
            currentPos = (currentPos + 1) % menuCount;            
        } else if (key == 'e') {
            selectedPos = currentPos
            console.clear();
            //displayStatus(stage, player, monster);
            break;
        }

        console.clear();
        displayStatus(stage, player, monster);
        logs.forEach((log) => console.log(log));
        displayMenu(currentPos);
    }
         
  }
};

export async function startGame() {
  console.clear();
  const player = new Player();
  let stage = 1;

  while (stage <= 10) {
    const monster = new Monster(stage);
    var win = await battle(stage, player, monster);
    if (win == false) {
      console.log('사망하셨습니다')
      return false
      break;
    } else {
      stage++;
    }
    // 스테이지 클리어 및 게임 종료 조건
  }
}