import chalk from 'chalk';
import readlineSync from 'readline-sync';

class Player {
  constructor() {
    this.hp = 100;
    this.strength = 10; // 최소 공격력
  }

  attack(monster) {
    monster.hp -= this.strength;
    return this.strength;
  }
}

class Monster {
  constructor() {
    this.hp = 100;
    this.strength = 8; // 최소공격력
  }

  attack(player) {
    player.hp -= this.strength;
    return this.strength;
  }
}

function displayRefresh(currentPos, stage, player, monster, logs) {
  console.clear();
  displayStatus(stage, player, monster)
  logs.forEach((log) => console.log(log));
  displayMenu(currentPos);
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
  var damagedToPlayer = 0
  var damagedToMonster = 0
  

  displayRefresh(currentPos, stage, player, monster, logs);
  while(player.hp > 0) {
    
    // console.clear();
    // displayStatus(stage, player, monster)
    // logs.forEach((log) => console.log(log));
    // displayMenu(currentPos)
    // 선택 전까지 방향키 입력 받기 (A - D // E)
    while(true) {
      key = readlineSync.keyIn('', {hideEchoBack: true, mask: '', limit: 'wasdeq'});
      if (key == 'a') {
        currentPos = (menuCount + currentPos - 1) % menuCount;
      } else if (key == 'd') {
          currentPos = (currentPos + 1) % menuCount;            
      } else if (key == 'e') {
          selectedPos = currentPos
          console.clear();
          break;
      } else if (key == 'q') {
          process.kill();
      }
      displayRefresh(currentPos, stage, player, monster, logs);
    }



    switch (selectedPos) {
      case 0:
          damagedToPlayer = monster.attack(player);
          damagedToMonster = player.attack(monster);
          logs.push(chalk.blueBright(`[${currentPos+1}] 몬스터에게 ${damagedToMonster}의 피해를 입혔습니다!`));
          logs.push(chalk.red(`[${currentPos+1}] 몬스터에게 ${damagedToPlayer}의 피해를 입었습니다!`));
          break;
      case 1:
          logs.push(chalk.blueBright(`[${currentPos+1}] 연속 공격을 했습니다!`));
          logs.push(chalk.red(`[${currentPos+1}] 몬스터가 ${damagedToPlayer}의 피해를 입혔습니다!`));
          monster.attack(player);
          break;
      case 2:
          logs.push(chalk.blueBright(`[${currentPos+1}] 방어를 선택 했습니다!`));
          logs.push(chalk.red(`[${currentPos+1}] 몬스터가 ${damagedToPlayer}의 피해를 입혔습니다!`));
          monster.attack(player);
          break;
      case 3:
          logs.push(chalk.blueBright(`[${currentPos+1}] 도망을 선택 했습니다!`));
          // 도망 확률 실패 -> 공격당함
          // 도망 성공 -> 다음 스테이지
          monster.attack(player);
          break;
      default:
          //logs.forEach((log) => console.log(log));
          //handleUserInput(); // 유효하지 않은 입력일 경우 다시 입력 받음
          //currentPos = handleUserInput(currentPos, stage, player, monster, logs);
    }

    if (monster.hp <= 0) {
      return true
    }

    displayRefresh(currentPos, stage, player, monster, logs);
  }
};

export async function startGame() {
  const player = new Player();
  let stage = 1;
  var win;

  while (stage <= 10) {
    const monster = new Monster(stage);
    win = await battle(stage, player, monster);
    console.log(win)
    if (win == false) {
      if (readlineSync.keyInYN('사망하셨습니다. 다시 도전하시겠습니까?')) {
        return true
      } else {
        return false
      }
    } else {
      stage++;
    }
    // 스테이지 클리어 및 게임 종료 조건
  }
}