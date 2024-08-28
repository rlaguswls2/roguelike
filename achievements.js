import chalk from 'chalk';
import fs from 'fs';

const FILE_PATH = './achievement_data.json';

class Achievement {
    constructor(name, description, goal, progress = 0, completed = false) {
        this.name = name;
        this.description = description;
        this.goal = goal;
        this.progress = progress;
        this.completed = completed;
    }

    // 업적의 진행 상황을 업데이트
    updateProgress(amount) {
        if (!this.completed) {
            this.progress += amount;
            if (this.progress >= this.goal) {
                this.complete();
            }
        }
    }

    // 업적 달성 처리
    complete() {
        this.completed = true;
        console.log(`업적 달성: ${this.name}!`);
    }
}

export class AchievementManager {
    constructor() {
        this.achievements = [
            new Achievement('첫 번째 몬스터 처치', '처음으로 몬스터를 처치합니다.', 1),
            new Achievement('몬스터 10마리 처치', '몬스터 10마리를 처치합니다.', 10),
            new Achievement('도망 성공 5회', '도망을 5번 성공합니다.', 5)
        ];

        // 기존에 저장된 업적 데이터가 있으면 로드
        this.loadAchievements();
    }

    saveAchievements() {
        const data = JSON.stringify(this.achievements, null, 2);
        fs.writeFileSync(FILE_PATH, data, 'utf-8');
        console.log("업적 데이터가 저장되었습니다.");
    }

    loadAchievements() {        
        if (fs.existsSync(FILE_PATH)) {
            const data = fs.readFileSync(FILE_PATH, 'utf-8');
            const savedAchievements = JSON.parse(data);

            this.achievements = savedAchievements.map(ach => 
                new Achievement(ach.name, ach.description, ach.goal, ach.progress, ach.completed)
            );
            console.log("업적 데이터가 로드되었습니다.");
        } else {
            console.log("기존 업적 데이터가 없습니다. 새로운 데이터를 생성합니다.");
        }
    }

    // 업적을 보여줌
    displayAchievements(currentPos) {
        console.clear();
        console.log(chalk.magentaBright("\n=== 업적 목록 ==="));
        this.achievements.forEach((achievement, index) => {
            if (index === currentPos) {
                console.log(chalk.black.bgWhite.bold(`${achievement.name}: ${achievement.description} (진행 상황: ${achievement.progress}/${achievement.goal}) ${achievement.completed ? '✅ 완료' : ''}`));
            } else {
                console.log(`${achievement.name}: ${achievement.description} (진행 상황: ${achievement.progress}/${achievement.goal}) ${achievement.completed ? '✅ 완료' : ''}`);
            }
        });
        
        // "이전으로 돌아가기" 옵션 추가
        if (currentPos === this.achievements.length) {
            console.log(chalk.black.bgWhite.bold('\n이전으로 돌아가기'));
        } else {
            console.log('\n이전으로 돌아가기');
        }

        console.log(chalk.magentaBright("=================\n"));
    }

    // 특정 업적의 진행 상황을 업데이트
    updateAchievement(name, amount) {
        const achievement = this.achievements.find(a => a.name === name);
        if (achievement) {
            achievement.updateProgress(amount);
            this.saveAchievements();
        }
    }
}

//module.exports = { AchievementManager };



