import chalk from 'chalk';
import readlineSync from 'readline-sync';

class Player {
  constructor() {
    this.hp = 100;
    this.attackAbility = 10; // 초기 공격력
    this.attackScale = 1.7;
    this.doubleAttackChance = 0.65;
  }

  getMaxDamage() {
    return Math.floor(this.attackAbility*this.attackScale);
  }

  attack(monster) {
    var finalDamage = rand(this.attackAbility, this.getMaxDamage());
    monster.hp = monster.hp - finalDamage;
    return finalDamage;
  }

  doubleAttack(monster) {
    randChance = Math.random();
    
    // 실패
    if (randChance > this.doubleAttackChance) {
      return 0;
    } else { // 성공
      return this.attack(monster) + this.attack(monster);
    }
  }
}

class Monster {
  constructor() {
    this.hp = 100;
    this.attackAbility = 8; // 초기 공격력
    this.attackScale = 1.7;
  }

  getMaxDamage() {
    return Math.floor(this.attackAbility*this.attackScale);
  }

  attack(player) {
    var finalDamage = rand(this.attackAbility, this.getMaxDamage());
    player.hp = player.hp - finalDamage;
    return finalDamage;
  }

}

//최소값 ~ 최대값 범위에서 랜덤한 값을 생성 (둘 다 정수여야 함)
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateStatus(stage, player, monster) {
  player.hp += 50 // %% 랜덤 적용하기 test로 50씩 회복 %%
  player.attackAbility += stage // %% 랜덤 적용하기 %%
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
      `| 플레이어 정보 | HP ${player.hp} ATK ${player.attackAbility} - ${player.getMaxDamage()} `,
    ) +
    chalk.redBright(
      ` | 몬스터 정보 | HP ${monster.hp} ATK ${monster.attackAbility} - ${monster.getMaxDamage()}`,
    ),
  );
  console.log(chalk.magentaBright(`=====================\n`));
}

const battle = async (stage, player, monster) => {
  let logs = [];
  var currentPos = 0
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
          break;
      } else if (key == 'q') {
          return false;
      }
      displayRefresh(currentPos, stage, player, monster, logs);
    }



    switch (currentPos) {
      case 0:
          damagedToMonster = player.attack(monster);
          logs.push(chalk.blueBright(`[${currentPos+1}] 몬스터에게 ${damagedToMonster}의 피해를 입혔습니다!`));
          if (monster.hp > 0) {
              damagedToPlayer = monster.attack(player);  
              logs.push(chalk.red(`[${currentPos+1}] 몬스터에게 ${damagedToPlayer}의 피해를 입었습니다!`));
          }
  
          break;
      case 1:
          //damagedToMonster = player.doubleAttack(monster);
          logs.push(chalk.blueBright(`[${currentPos+1}] 연속 공격을 했습니다!`));

          if (monster.hp > 0) {
            damagedToPlayer = monster.attack(player);
            logs.push(chalk.red(`[${currentPos+1}] 몬스터에게 ${damagedToPlayer}의 피해를 입었습니다!`));
          }
          
          break;
      case 2:
          //player.defense();
          //logs.push(chalk.blueBright(`[${currentPos+1}] 잠시동안 방어도가 ${player.armor}만큼 증가했습니다!`));
          damagedToPlayer = monster.attack(player);
          logs.push(chalk.red(`[${currentPos+1}] 몬스터에게 ${damagedToPlayer}의 피해를 입었습니다!`));          
          break;
      case 3:
          logs.push(chalk.blueBright(`[${currentPos+1}] 도망을 선택 했습니다!`));
          // 도망 확률 실패 -> 공격당함
          // 도망 성공 -> 다음 스테이지
          monster.attack(player);
          break;
    }


    if (monster.hp <= 0) {
      return true
    }

    displayRefresh(currentPos, stage, player, monster, logs);
  }
};

export function startGame() {
  const player = new Player();
  let stage = 1;

  while (stage <= 10) {
    const monster = new Monster(); // %% 인자로 매 스테이지값을 통해 몬스터 강화 %%
    const win = battle(stage, player, monster);
    
    if (!win) {
      if (readlineSync.keyInYN('사망하셨습니다. 다시 도전하시겠습니까?')) {
        return true
      } else {
        console.log(chalk.red('게임이 종료됩니다.'));
        return false
      }
    } else {
      console.log(chalk.green(`축하합니다! 스테이지 ${stage}를 클리어 하셨습니다.`));
      stage++;
      updateStatus(stage, player, monster);
      
    }
    // 스테이지 클리어 및 게임 종료 조건
  }

  return false; // 모든 스테이지 클리어 후 메인메뉴로 돌아감.
}