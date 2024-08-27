import chalk from 'chalk';
import readlineSync from 'readline-sync';

class Player {
  constructor() {
    this.hp = 100;
    this.attackAbility = 10; // 초기 공격력
    this.attackScale = 1.7;
    this.doubleAttackChance = 0.65;
    this.defenseChance = 0.65;
    this.defenseStatus = false;
    this.counterRatio = 0.6;
    this.runOutChance = 0.2;
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
    const randChance = Math.random();
    
    // 실패
    if (randChance > this.doubleAttackChance) {
      return 0;
    } else { // 성공
      return this.attack(monster) + this.attack(monster);
    }
  }

  counterAttack(monster) {
    var finalDamage = Math.floor(rand(this.attackAbility, this.getMaxDamage())*this.counterRatio);
    monster.hp = monster.hp - finalDamage;
    return finalDamage;
  }

  defense(monster) {
    const randChance = Math.random();

    if (randChance > this.defenseChance) {
      this.defenseStatus = false;
      return 0;
    } else { // 성공 counterRatio 만큼의 공격력으로 반격
      this.defenseStatus = true;
      return this.counterAttack(monster);
    }
  }

  runOut() {
    const randChance = Math.random();

    if (randChance > this.runOutChance) {
      //도망 실패
      return false;
    } else {
      //도망 성공
      return true;
    }
  }
}

class Monster {
  constructor(stage) {
    this.stageScale = 0.2;
    this.hp = Math.floor(100 * stage * this.stageScale);
    this.attackAbility = Math.floor(8 * stage * this.stageScale); // 초기 공격력
    this.attackScale = Math.floor(1.7 * stage * this.stageScale);
  }

  getMaxDamage() {
    return Math.floor(this.attackAbility*this.attackScale);
  }

  getDamage() {
    return rand(this.attackAbility, this.getMaxDamage());
  }

  attack(player) {
    const finalDamage = this.getDamage();
    player.hp = player.hp - finalDamage;
    return finalDamage;
  }

}

//최소값 ~ 최대값 범위에서 랜덤한 값을 생성 (둘 다 정수여야 함)
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function updateStatus(stage, player, monster) {
  player.hp += 20; // 기본 제공되는 체력 회복
  var menuCount = 6
  // 랜덤하게 아래의 능력치중 하나가 정해진 수치내에서 증가
  var random = rand(1, menuCount);
  switch (random) {
    case 1:
      player.hp += rand(20, 50);
      break;
    case 2:
      player.attackAbility += rand(5, 10);
      break;
    case 3:
      player.attackScale += rand(10, 100)*0.01;
      break;
    case 4:
      player.runOutChance += rand(1, 3)*0.01;
      break;
    case 5:
      player.doubleAttackChance += rand(3, 7)*0.01;
      break;
    case 6:
      player.defenseChance += rand(3, 10)*0.01;
  }
}

function displayRefresh(currentPos, stage, player, monster, logs) {
  console.clear();
  displayStatus(stage, player, monster)
  logs.forEach((log) => console.log(log));
  displayMenu(currentPos, player);
}

function displayMenu(currentPos, player) {
  switch (currentPos) {
      case 0:
          process.stdout.write(chalk.blue.bgWhite.bold('1.') + chalk.black.bgWhite.bold(' 일반공격'))
          process.stdout.write(' ')
          process.stdout.write(chalk.green('2.') + chalk.green(` 연속공격(${Math.floor(player.doubleAttackChance*100)}%)`))
          process.stdout.write(' ')
          process.stdout.write(chalk.green('3.') + chalk.green(` 방어한다(${Math.floor(player.defenseChance*100)}%)`))
          process.stdout.write(' ')
          process.stdout.write(chalk.green('4.') + chalk.green(` 도망친다(${Math.floor(player.runOutChance*100)}%)`))
          console.log('');
          break;
      case 1:
          process.stdout.write(chalk.green('1.') + chalk.green(' 일반공격'))
          process.stdout.write(' ')
          process.stdout.write(chalk.blue.bgWhite.bold('2.') + chalk.blue.bgWhite.bold(` 연속공격(${Math.floor(player.doubleAttackChance*100)}%)`))
          process.stdout.write(' ')
          process.stdout.write(chalk.green('3.') + chalk.green(` 방어한다(${Math.floor(player.defenseChance*100)}%)`))
          process.stdout.write(' ')
          process.stdout.write(chalk.green('4.') + chalk.green(` 도망친다(${Math.floor(player.runOutChance*100)}%)`))
          console.log('');
          break;
      case 2:
          process.stdout.write(chalk.green('1.') + chalk.green(' 일반공격'))
          process.stdout.write(' ')
          process.stdout.write(chalk.green('2.') + chalk.green(` 연속공격(${Math.floor(player.doubleAttackChance*100)}%)`))
          process.stdout.write(' ')
          process.stdout.write(chalk.blue.bgWhite.bold('3.') + chalk.black.bgWhite.bold(` 방어한다(${Math.floor(player.defenseChance*100)}%)`))
          process.stdout.write(' ')
          process.stdout.write(chalk.green('4.') + chalk.green(` 도망친다(${Math.floor(player.runOutChance*100)}%)`))
          console.log('');
          break;
      case 3:
          process.stdout.write(chalk.green('1.') + chalk.green(' 일반공격'))
          process.stdout.write(' ')
          process.stdout.write(chalk.green('2.') + chalk.green(` 연속공격(${Math.floor(player.doubleAttackChance*100)}%)`))
          process.stdout.write(' ')
          process.stdout.write(chalk.green('3.') + chalk.green(` 방어한다(${Math.floor(player.defenseChance*100)}%)`))
          process.stdout.write(' ')
          process.stdout.write(chalk.blue.bgWhite.bold('4.') + chalk.black.bgWhite.bold(` 도망친다(${Math.floor(player.runOutChance*100)}%)`))
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
          damagedToMonster = player.doubleAttack(monster);
          if (damagedToMonster == 0) {
            logs.push(chalk.blueBright(`[${currentPos+1}] 연속공격이 실패했습니다.`));
          } else {
            logs.push(chalk.blueBright(`[${currentPos+1}] 연속공격이 성공하여 ${damagedToMonster}의 피해를 입혔습니다!`));
          }
        
          if (monster.hp > 0) {
            damagedToPlayer = monster.attack(player);
            
            logs.push(chalk.red(`[${currentPos+1}] 몬스터에게 ${damagedToPlayer}의 피해를 입었습니다!`));
          }
          
          break;
      case 2: // 방어
          const defenseResult = player.defense(monster)
          if (defenseResult == 0) {
            logs.push(chalk.blueBright(`[${currentPos+1}] 방어에 실패했습니다.`));

            damagedToPlayer = monster.attack(player);  
            logs.push(chalk.red(`[${currentPos+1}] 몬스터에게 ${damagedToPlayer}의 피해를 입었습니다!`));
          } else {
            logs.push(chalk.blueBright(`[${currentPos+1}] 방어에 성공했습니다! 반격하여 ${defenseResult}의 피해를 입혔습니다!`));
          }
               
          break;
      case 3:
          const runOutResult = player.runOut();
          if (runOutResult) {
            return true;
            // 다음 스테이지
          } else {
            logs.push(chalk.blueBright(`[${currentPos+1}] 도망에 실패했습니다..`));
            damagedToPlayer = monster.attack(player);  
            logs.push(chalk.red(`[${currentPos+1}] 몬스터에게 ${damagedToPlayer}의 피해를 입었습니다!`));
          }
          break;
    }


    if (monster.hp <= 0) {
      return true
    }
    if (player.hp <= 0) {
      return false
    }

    displayRefresh(currentPos, stage, player, monster, logs);
  }
};

export function startGame() {
  const player = new Player();
  let stage = 1;

  while (stage <= 10) {
    const monster = new Monster(stage); // %% 인자로 매 스테이지값을 통해 몬스터 강화 %%
    const win = battle(stage, player, monster);
    
    if (!win) {
      return false
    } else {
      console.log(chalk.green(`축하합니다! 스테이지 ${stage}를 클리어 하셨습니다.`));
      stage++;
      updateStatus(stage, player, monster);
      
    }
    // 스테이지 클리어 및 게임 종료 조건
  }

  return false; // 모든 스테이지 클리어 후 메인메뉴로 돌아감.
}