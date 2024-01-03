//@ts-check
/**
 * MTI RITUTO (c)
 * discord rituto135877 <@1139508960693604393>
 */
import { EntitySkinIdComponent, ScriptEventCommandMessageAfterEvent, system, world,Player } from "@minecraft/server";//インポート
import { ActionFormData,MessageFormData,ModalFormData,FormCancelationReason } from "@minecraft/server-ui";
//フォームのメインクラス
export class from {
    /**
     * @param {Player} player
     */
    constructor(player) {
        this.player = player
    }
    /**
     * @param {String} message
     *一番目のメニュー
     */
    async menu01(message) {
                // @ts-ignore
        const body = [`採掘数:${world.scoreboard.getObjective("mine").getScore(this.player)}`,`所持金:${world.scoreboard.getObjective("kane").getScore(this.player)}`,message+"§r"]
        // @ts-ignore
        const fro = new ActionFormData()
        .title("メニュー")
        .body(body.join("\n"))
        .button("送金")
        .button("プレゼントコード")
        .button("tpメニュー")
        .button("運営用メニュー")
        .button("プレイヤーの通報")
        .button("他のプレイヤーのステータスを見る")
        .button("メッセージや実績を見る")
        .button("ブラックジャック")
        .button("ガチャ")
        .button("銀行")
        .show(this.player).then(async (res) =>{
            if (res.selection == 0){
                this.sendmoney()
            }else if (res.selection == 1){
                this.code()
            }else if (res.selection ==2){
                this.tpmenu()
            }else if (res.selection == 3){
                this.unmenu()
            }else if (res.selection == 4){
                this.tuuhou()
            }else if (res.selection == 5){
                this.settus()
            }else if (res.selection == 6){
                this.message()
            }else if (res.selection == 7){
                this.bj()
            }else if (res.selection == 8){
                this.gatya()
            }else if (res.selection == 9){
                this.ginkou()
            }
        })
    }
  //銀行
    ginkou() {
        // @ts-ignore
        new ActionFormData().title("銀行").body([`所持金:${world.scoreboard.getObjective("kane").getScore(this.player)}`,`${Math.floor(this.player.getDynamicProperty("ginko"))}G\ue102預けてます`].join("\n")).button('預ける').button("引き出す").show(this.player).then(async (res) =>{
            if (res.selection == 0){
                // @ts-ignore
                new ModalFormData().title("預ける数値を入れてください").textField(`所持金:${world.scoreboard.getObjective("kane").getScore(this.player)}\n預ける金額を入力してください`,"例100").show(this.player).then(async (res) =>{
                    if (res.canceled){ this.menu01("預けるをキャンセルしました")
                    return}
        
                // @ts-ignore
                
                if (isNaN(Math.floor(res.formValues[0].replace("all",world.scoreboard.getObjective("kane").getScore(this.player))))){
                    this.menu01("§cError:数値を入れてください")
                    return
                }
        
                // @ts-ignore
                if ( Math.floor(res.formValues[0].replace("all",world.scoreboard.getObjective("kane").getScore(this.player))) < 20){
                    this.menu01("§cError預ける数をを20未満にはできません")
                    return
                }
        
                // @ts-ignore
                if ( Math.floor(res.formValues[0]) > world.scoreboard.getObjective("kane").getScore(this.player)){
                    // @ts-ignore
                    this.menu01(`§cError:${res.formValues[0]}G\ue102を賭けるにはあと${res.formValues[0] - world.scoreboard.getObjective("kane").getScore(this.player) }G\ue102必要です`)
                    return
                }
                        // @ts-ignore
                        this.player.runCommandAsync(`scoreboard players remove @s kane ${res.formValues[0]}`)
        // @ts-ignore
        this.player.setDynamicProperty("ginko",Math.floor(Math.floor(this.player.getDynamicProperty("ginko")) +  Math.floor(res.formValues[0])))
        // @ts-ignore
        this.menu01(`${res.formValues[0]}G\ue102預けました`)
                })
            }else if (res.selection == 1){
                // @ts-ignore
                new ModalFormData().slider(`${this.player.getDynamicProperty("ginko")}G\ue102預けてます`,0,Math.floor(this.player.getDynamicProperty("ginko")),1).title("引き出し").show(this.player).then(async (res) =>{
                    // @ts-ignore
                    this.player.runCommandAsync(`scoreboard players add @s kane ${res.formValues[0]}`)
                    // @ts-ignore
                    this.player.setDynamicProperty("ginko",Math.floor(this.player.getDynamicProperty("ginko") -  Math.floor(res.formValues[0])))
                })
            }
        })
    }
  //ガチャ
    async gatya(){
        // @ts-ignore
        new ActionFormData().title("ガチャ").body([`所持金:${world.scoreboard.getObjective("kane").getScore(this.player)}`].join("\n")).button("ノーマルガチャ 200G").button("レアガチャ 3000G").button("伝説ガチャ99999G").show(this.player).then( (res) =>{
            if (res.canceled) {
                this.menu01("")
                return
            }
            if (res.selection == 0){
                // @ts-ignore
                if (world.scoreboard.getObjective("kane").getScore(this.player) < 200){
                    // @ts-ignore
                    this.menu01("Error:§c所持金が足りません")
                    return
                }

// @ts-ignore
this.player.runCommandAsync(`scoreboard players remove @s kane 200`)

                this.player.sendMessage("ガチャを引きます")
                     if (this.getRandomInt(1,4) == 3){
                    this.player.sendMessage("ただの石が60こ当たりました")
                    for (let index = 0; index < 60; index++) {
                        this.player.runCommand("/structure load isi1 ~~1~")                        
                    }
                    this.player.runCommand("say がノーマルガチャでただの石が60こ当たりました")
                }else if (this.getRandomInt(1,7) == 5){
                    this.player.sendMessage("珍しい石が3こ当たりました")
                    for (let index = 0; index < 3; index++) {
                        this.player.runCommand("/structure load isi2 ~~1~")                        
                    }
                    this.player.runCommand("say がノーマルガチャで珍しい石が3こ当たりました")
                }else {
                    this.player.sendMessage("ただのごみが当たりました")
                    this.player.runCommand("/structure load gomi ~~1~")
                    this.player.runCommand("say がノーマルガチャでただのごみが当たりました")

                }
            }
        })
    }

    
    
    /**
     * @param {number} min
     * @param {number} max
     */
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
      }
  //ブラックジャック
    async bj() {
        // @ts-ignore
        // @ts-ignore
        // @ts-ignore
        const fro = new ModalFormData().title("かける金額を決めてください").textField(`所持金:${world.scoreboard.getObjective("kane").getScore(this.player)}\n賭け額を入力してください`,"例100,allにすると全額かけれます").show(this.player).then(async (res) =>{
            if (res.canceled){ this.menu01("bjをキャンセルしました")
            return}

        // @ts-ignore
        
        if (isNaN(Math.floor(res.formValues[0].replace("all",world.scoreboard.getObjective("kane").getScore(this.player))))){
            this.menu01("§cError:数値を入れてください")
            return
        }

        // @ts-ignore
        if ( Math.floor(res.formValues[0].replace("all",world.scoreboard.getObjective("kane").getScore(this.player))) < 10){
            this.menu01("§cError:賭ける数を10未満にはできません")
            return
        }

        // @ts-ignore
        if ( Math.floor(res.formValues[0]) > world.scoreboard.getObjective("kane").getScore(this.player)){
            // @ts-ignore
            this.menu01(`§cError:${res.formValues[0]}G\ue102を預けるにはあと${res.formValues[0] - world.scoreboard.getObjective("kane").getScore(this.player) }G\ue102必要です`)
            return
        }
        // @ts-ignore

        this.crad(Math.round(this.getRandomInt(6,10)),Math.floor(res.formValues[0].replace("all",world.scoreboard.getObjective("kane").getScore(this.player))))
        // @ts-ignore

        this.player.runCommandAsync(`say がブラックジャックで${Math.floor(res.formValues[0].replace("all",world.scoreboard.getObjective("kane").getScore(this.player)))}をかけました`)

        })
    }

    /**
     * @param {number} maisuu
     * @param {number} kakekinn
     *ブラックジャックのカード引く部分
     */
    async crad(maisuu,kakekinn){
        if (maisuu > 21){
            this.menu01(`カード枚数が21毎超えましたあなたの負けですカード枚数${maisuu} 21をオーバーしてしまいました`)
            this.player.runCommandAsync(`scoreboard players remove @s kane ${kakekinn}`)
            this.player.runCommandAsync(`say がブラックジャックで負けましたカード枚数${maisuu} 21をオーバーしてしまいました`)
            return
        }
        new ActionFormData().title("ブラックジャック").body([`掛け金:${kakekinn}`,`カード数${maisuu}`].join("\n")).button("カードを引く").button("ディラーに引かせる").show(this.player).then(async (res) =>{
            if (res.canceled){
            await this.crad(maisuu,kakekinn)
            return}
            if (res.selection == 0) {
                const kadoo = Math.round(this.getRandomInt(1,6))
                await this.crad(maisuu+ kadoo,kakekinn)
            }else if (res.selection == 1){
                const kado = this.getRandomInt(17,24)
                if (kado > 21){
                  //ディらーがオーバーしてしまったとき
                    this.menu01(`あなたの勝ちですディラーのカード${kado} 21をオーバーてしましました`)
                    this.player.runCommandAsync(`say がブラックジャックで勝利しましたカード${maisuu}枚ディラーのカード${kado}枚ディラーが21をオーバーてしましました`)
                    this.player.runCommandAsync(`scoreboard players add @s kane ${kakekinn}`)

                    return
                }
                if (kado == maisuu){
                  //引き分け
                    this.menu01(`引き分けですディラーのカード${kado} `)
                    this.player.runCommandAsync(`say がブラックジャックで引き分けになりましたカード${maisuu}枚ディラーのカード${kado}枚`)
                    return
                }
                if (kado < maisuu){
                  //シンプルな勝ち
                    this.menu01(`あなたの勝ちですディラーのカード${kado}あなたの枚数${maisuu} \nあなたの枚数は${maisuu -kado}枚多いいので勝ちです`)
                    this.player.runCommandAsync(`say が勝ちましたディラーのカード${kado}カードの枚数${maisuu} \nカードの枚数は${maisuu -kado}枚多いいので勝ちです`)
                    this.player.runCommandAsync(`scoreboard players add @s kane ${kakekinn}`)

                    return
                }
                if (maisuu < kado){
                  //シンプルな負け
                    this.menu01(`あなたの負けですカード枚数${maisuu} ディラーのカード${kado} \nディラーのカードが${kado - maisuu}枚多いいので負けです`)
                    this.player.runCommandAsync(`scoreboard players remove @s kane ${kakekinn}`)
                    this.player.runCommandAsync(`say がブラックジャックで負けましたカード枚数${maisuu} ディラーのカード${kado} \nディラーのカードが${kado - maisuu}枚多いいので負けです`)
                    return
                }
            }
        })
    }
  //実績などのログ
    async message() {
        // @ts-ignore
        const fro = new ActionFormData().body(this.player.getDynamicProperty("logs")).button("ログを消す").title("ログ")
        .show(this.player).then(async (res) =>{
            if (res.canceled) this.menu01("")
            if (res.canceled) return
            this.player.setDynamicProperty("logs","")
            this.menu01("ログを消しました")
            return
        })
    }
  //ステータス
    async settus(){
        const pla = world.getAllPlayers()
        const fro = new ActionFormData()
        .title("他のプレイヤーのステータスを確認")
        .body("")
        pla.forEach(async (i) =>{
            fro.button(i.name)
        })
        fro.show(this.player).then(async (res) =>{
            if (res.canceled){
                this.menu01("他のプレイヤーのステータスを確認をキャンセルしました")
            }
            // @ts-ignore
            new MessageFormData().title(`${pla[res.selection].name}のステータス`)
            // @ts-ignore
            .body([`採掘数:${world.scoreboard.getObjective("mine").getScore(pla[res.selection])}`,`所持金:${world.scoreboard.getObjective("kane").getScore(pla[res.selection])}`,`座標x:${pla[res.selection].location.x} y:${pla[res.selection].location.y} z:${pla[res.selection].location.z}`].join("\n"))
            .button1("ok")
            .button2("ok")
            .show(this.player)
        })
    }
  //tpメニュー
    tpmenu() {
        const menus =[{name:"ロビー",c:"26 -60 76"},{name:"丸石採掘",c:"45 -60 97"},{name:"クラフト",c:"0 -55 82"},{name:"鉄採掘場",c:"31.36 -56.80 101.88"}]
        const fro = new ActionFormData()
        .title("tpメニュー");
        menus.forEach(async (i)=>{
            fro.button(i.name)
        })
        fro.body("tpするところを選択してください")
        fro.show(this.player).then(async (res)=>{
            if (res.canceled){
                this.menu01("tpをキャンセルしました")
                return
            }
            // @ts-ignore
            this.player.runCommandAsync("tp @s "+menus[res.selection].c)
        })

    }
  //通保
    async tuuhou() {
        const players = world.getAllPlayers().map((p) =>{
            return p.name
        })
        const fro = new ActionFormData()
        players.forEach(async (i) =>{
            fro.button(i)
        })
        fro.body("通報するプレイヤーを選んでください")
        .title("プレイヤーの通報")
        .show(this.player).then(async (res) =>{
            if (res.canceled){ this.menu01("通報するプレイヤーを選択をキャンセルしました")
            return}        
        const riyuu = ["Nuker","暴言","スパム","giveを使用","権利濫用","NBT"];
        // @ts-ignore
        const a = players[res.selection]
        // @ts-ignore
        const f = new ModalFormData()
        // @ts-ignore
        .title(`${players[res.selection]}を通報`)
        .dropdown("理由を選択",riyuu)
        .textField(`詳細`,"例石採掘上でNukerを使用しました")
        .show(this.player).then(async (res) =>{
            // @ts-ignore
            this.player.runCommandAsync(`say が${a}を通報しました理由${riyuu[res.formValues[0]]}詳細${res.formValues[1]}`)
            // @ts-ignore
            world.setDynamicProperty("logs",`${world.getDynamicProperty("logs")}\n${this.player.name}が${a}を通報しました理由${riyuu[res.formValues[0]]}詳細${res.formValues[1]}`)
        })
    })
        }
  //運営メニュー
    async unmenu() {
        const fro = new ActionFormData()
        if (!this.player.isOp()){
          //opを持ってるかどうか
            this.menu01("§cError:あなたは運営じゃないため開けません")
            return
        }
        fro.title("運営メニュー")
        fro.body("運営用メニュー")
        fro.button("送金ログや報告ログ")
        fro.show(this.player).then(async (res) =>{
            if (res.canceled) {
                this.menu01("")
                return
            }
            if (res.selection == 0){
              送金などのログ
                const from = new ActionFormData()
                .title("ログ")
                // @ts-ignore
                .body(world.getDynamicProperty("logs"))
                .button("ログを消す")
                .show(this.player).then(async (res) =>{
                    if (res.canceled) {
                        this.unmenu()
                        return
                    }
                     world.setDynamicProperty("logs")
                     this.menu01("ログを消しました")
                })
            }
        })
    }
//送金
    async sendmoney(){
        const players = world.getAllPlayers().map((p) =>{
            return p.name
        })
        const fro = new ActionFormData()
        players.forEach((i) =>{
            fro.button(i)
        })
        fro.title("送金")
        fro.body("送りたいプレイヤーを選択してください")

        .show(this.player).then(async (res) =>{
            if (res.canceled){ this.menu01("送金するプレイヤーを選択をキャンセルしました")
            return}
        const sou = new ModalFormData()
        // @ts-ignore
        sou.title(`${players[res.selection]}に送金`)
        /** @type {number} */
        // @ts-ignore
        const  selection = res.selection
        // @ts-ignore
        sou.textField(`所持金:${world.scoreboard.getObjective("kane").getScore(this.player)}\n送る数`,"例100など")
        sou.show(this.player).then(async (res) =>{
            if (res.canceled){ this.menu01("送金をキャンセルしました")
                return}
            // @ts-ignore
            if (isNaN(Math.floor(res.formValues[0]))){
                this.menu01("§cError:数値を入れてください")
                return
            }
            // @ts-ignore
            if ( Math.floor(res.formValues[0]) < 100){
                this.menu01("§cError:送る数を100未満にはできません")
                return
            }
            // @ts-ignore
            if ( Math.floor(res.formValues[0]) > world.scoreboard.getObjective("kane").getScore(this.player)){
                // @ts-ignore
                this.menu01(`§cError:${res.formValues[0]}G\ue102を送るにはあと${res.formValues[0] - world.scoreboard.getObjective("kane").getScore(this.player) }G\ue102必要です`)
                return
            }
            // @ts-ignore
            this.player.runCommandAsync(`scoreboard players remove @s kane ${res.formValues[0]}`)
            // @ts-ignore
            this.player.runCommandAsync(`scoreboard players add ${players[selection]} kane ${res.formValues[0]}`)
            // @ts-ignore
            this.menu01(`${players[selection]}に${res.formValues[0]}G\ue102送りました`)
            // @ts-ignore
            this.player.runCommandAsync(`say が${players[selection]}に${res.formValues[0]}G送りました`)
            // @ts-ignore
            world.setDynamicProperty("logs",`${world.getDynamicProperty("logs")}\n${this.player.name}が${players[selection]}に${res.formValues[0]}G送りました`)
        })
        })
    }
  //プレゼントコード
    async code(){
        // @ts-ignore
        const fro = new ModalFormData()
        .textField("コードを入力","例123456789等")
        .title("プレゼントコード")
        .show(this.player).then(async (res) =>{
            if (res.canceled){ this.menu01("プレゼントコード入力がキャンセルされました")
                 return}
            const cod = [{name:51253/** @type {Number} */,command:["scoreboard players add @s kane 500"]},{name:202413/** @type {Number} */,command:["scoreboard players add @s kane 48576"]}]
            var bool = false
            // @ts-ignore
            if (isNaN(Math.floor(res.formValues[0]))){
                this.menu01("§cError:数値を入れてください")
                return
            }
            cod.forEach(async (i) =>{
                // @ts-ignore
                if (Math.floor(res.formValues[0]) == i.name){
                    bool = true
                    // @ts-ignore
                    if (this.player.hasTag("plcd:"+res.formValues[0])){
                        // @ts-ignore
                        this.menu01("§cError:プレゼントコード"+res.formValues[0]+"は受け取り済みです")
                        return true
                    }
                    i.command.forEach(async (cmd) =>{
                        this.player.runCommandAsync(cmd)
                    })
                    // @ts-ignore
                    this.player.addTag("plcd:"+res.formValues[0])
                    //@ts-ignore
                    this.menu01("プレゼントコード"+res.formValues[0]+"を受け取りました")
                    return true;
                }
            })
            if (!bool){
                // @ts-ignore
                this.menu01("§cError:プレゼントコード"+res.formValues[0]+"は存在しません")

            }
        })
    }
}
