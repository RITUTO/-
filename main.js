// @ts-check
// @ts-ignore
import { EntitySkinIdComponent, ScriptEventCommandMessageAfterEvent, system, world ,EquipmentSlot} from "@minecraft/server";//インポート
// @ts-ignore
import { ActionFormData,MessageFormData,ModalFormData,FormCancelationReason, FormRejectReason } from "@minecraft/server-ui";
import { from } from "./menu";
export class main {
   var = 0
    constructor(){
      this.startTime = Date.now();

          }
    
    /** @param {Number} ver  */
    setver(ver){
      this.var = ver
    }

    run(){
      world.afterEvents.playerSpawn.subscribe(async (ev) =>{
        const {player} = ev
        const set ={
          ruru:true,
          discord:true,
      
        }
        /** @type {set} */
        
      // @ts-ignore
      const setting = JSON.parse(player.getDynamicProperty("setting"))
         if (setting.ruru&&  ev.initialSpawn){
         new from(player).rurup1()}
      })
      world.beforeEvents.chatSend.subscribe(async(ev) => {
        const  { message,sender} = ev
        if (message== ".ruru"){
          system.run(  () =>{  new from(sender).rurup1()})
          sender.sendMessage("チャットを閉じると表示します")
          ev.cancel = true
          return
        }else
        if (message == ".setting"||message == ".config"){
          system.run(  () =>{  new from(sender).setting()})
          sender.sendMessage("チャットを閉じると表示します")
          ev.cancel = true
      
        }else　if (message ==".運営自己紹介"){
          system.run(  () =>{  new from(sender).umsytoukai()})
          sender.sendMessage("チャットを閉じると表示します")
          ev.cancel = true
        }else
        if (message== ".menu"){
          system.run(  () =>{  new from(sender).menu01("")})
          sender.sendMessage("チャットを閉じると表示します")
          ev.cancel = true
          return
        }else if (message==".暗視"){
          ev.cancel = true
      
          system.run(() =>{
            sender.addTag("ansi")
      
          })   
          sender.sendMessage("暗視を付けました")
          ev.cancel = true
      
          
        }else if (message == ".sendmoney"){
          system.run(  () =>{  new from(sender).sendmoney()})
          sender.sendMessage("チャットを閉じると表示します")
          ev.cancel = true
      
        }else if (message == ".暗視を消す"){
          system.run(() =>{
            sender.removeTag("ansi")
      
          })
          sender.sendMessage("暗視を消しました\n完全に消えるまで最大10秒")
          ev.cancel = true
      
        }else if (message.indexOf("暗視") != -1&&message.startsWith(".")){
          sender.sendMessage("§cエラーコマンドが見つかりませんでした\n§rもしかして\n.暗視を消す .暗視")
          ev.cancel = true
        }else {
          if (message.startsWith(".")){
          sender.sendMessage("§cコマンドが見つかりませんでした")
          ev.cancel = true}
        }
        if (ev.cancel) return
        if (sender.hasTag("admin")){
          world.getDimension("overworld").getEntities({name:"ADMIN"})[0].runCommandAsync(`say <${sender.name}> ${message}`)
          ev.cancel = true
        }
        if (sender.hasTag("admin-item")){
          world.getDimension("overworld").getEntities({name:"アイテム制作班"})[0].runCommandAsync(`say <${sender.name}> ${message}`)
          ev.cancel = true
        }
        if (sender.hasTag("admin-ken")){
          world.getDimension("overworld").getEntities({name:"運営建築班"})[0].runCommandAsync(`say <${sender.name}> ${message}`)
          ev.cancel = true
        }
      });
    
      world.afterEvents.itemUse.subscribe(async (ev) => {
        if (ev.itemStack.typeId == "minecraft:nether_star") new from(ev.source).menu01("")
          
        if (ev.itemStack.typeId == "minecraft:nether_star") return
      })
      world.beforeEvents.itemUse.subscribe(async (ev) =>{
      if (ev.itemStack.typeId == "minecraft:ender_pearl"){
        ev.cancel = true
        if (ev.itemStack.nameTag =="採掘速度上昇(lv:1 30秒)投げて使います")
        {
          ev.source.runCommandAsync("clear @s ender_pearl 0 1")
          ev.source.runCommandAsync("/effect @s haste 30 1 true")
        }else
        if (ev.itemStack.nameTag =="採掘速度上昇(lv:2 30秒)投げて使います")
        {
          ev.source.runCommandAsync("clear @s ender_pearl 0 1")
          ev.source.runCommandAsync("/effect @s haste 30 2 true")
        }
      }
      })
      system.runInterval(async function (){
       world.getDimension("overworld").runCommandAsync("/scoreboard players set 参加人数 game 0")
        if (!world.getDynamicProperty("logs")) world.setDynamicProperty("logs","")
      
      world.getAllPlayers().forEach(async (player) =>{
        // @ts-ignore
        if (world.scoreboard.getObjective("lv").getScore(player) > 10 ){
          player.runCommandAsync("effect @s haste 1 1 true")
          }
          // @ts-ignore
          if (world.scoreboard.getObjective("lv").getScore(player) > 19 ){
            player.runCommandAsync("effect @s haste 1 2 true")
            }
        if (!player.getDynamicProperty("setting")) player.setDynamicProperty("setting",JSON.stringify({
          ruru:true,
          discord:true, }))
        if (!player.getDynamicProperty("logs")) player.setDynamicProperty("logs","")
        if (!player.getDynamicProperty("ginko")) player.setDynamicProperty("ginko",0)
        world.getDimension("overworld").runCommandAsync("/scoreboard players add 参加人数 game 1")
        // @ts-ignore
        player.runCommandAsync(`/title @s actionbar 所持金:${world.scoreboard.getObjective("kane").getScore(player)}G\ue102\n採掘数:${world.scoreboard.getObjective("mine").getScore(player)}\nlv:${world.scoreboard.getObjective("lv").getScore(player)}\nレベルアップまであと${world.scoreboard.getObjective("xp2").getScore(player) - world.scoreboard.getObjective("xp1").getScore(player) ?? 50}\nルビー${world.scoreboard.getObjective("kane2").getScore(player) ?? 0}`)
        // @ts-ignore
        if (world.scoreboard.getObjective("xp2").getScore(player) < world.scoreboard.getObjective("xp1").getScore(player)){
          player.runCommand("title @s title レベルアップ!")
          player.runCommand("/scoreboard players set @s xp1 0")
          // @ts-ignore
          player.runCommand("/scoreboard players set @s xp2 "+Math.round(world.scoreboard.getObjective("xp2").getScore(player)* 1.2))
          // @ts-ignore
          if (world.scoreboard.getObjective("lv").getScore(player) < 99) {player.runCommand("/scoreboard players add @s lv 1")}else if (!player.hasTag("kan")){
            player.runCommandAsync("tag @s add kan")
            player.sendMessage("実績を解除しましたメニューからメッセージや実績を見るを確認してみましょう")
            player.setDynamicProperty("logs",player.getDynamicProperty("logs")+`\n実績lvカンスト!\nロールパスワード1529120`)
          }
        // @ts-ignore
        }
      })})
      
      world.beforeEvents.playerBreakBlock.subscribe(async (ev) =>{
        if (ev.itemStack){
        if (ev.itemStack.nameTag=="石炭ピッケル早いただし熱い") ev.player.runCommandAsync("/damage @s 1 fire")}
      
        if (ev.block.typeId == "minecraft:coal_ore"){
          ev.player.runCommandAsync("/scoreboard players add @s mine 1")

        
          ev.player.runCommandAsync("/scoreboard players add @s xp1 5")
          ev.cancel = true
          ev.player.runCommandAsync(`setblock ${ev.block.x} ${ev.block.y} ${ev.block.z} air`)
          ev.player.runCommandAsync("/structure load se1 ~~1~ ")
          ev.player.runCommandAsync("/scoreboard players add @s kane 5 ")
        }
        if (ev.block.typeId == "minecraft:stone"){
          ev.player.runCommandAsync("/scoreboard players add @s mine 1")
          ev.player.runCommandAsync("/scoreboard players add @s xp1 1")
          if (ramdom(80)){
            ev.player.runCommandAsync("/scoreboard players add @s xp1 2")
      
          ev.player.runCommandAsync("/scoreboard players add @s kane 1")
          ev.player.runCommandAsync("/structure load isi1 ~~1~ ")}else if (ramdom(14)){
            ev.player.runCommandAsync("/scoreboard players add @s xp1 7")
      
             ev.player.runCommandAsync("/scoreboard players add @s kane 2")
            ev.player.runCommandAsync("/structure load isi2 ~~1~ ")
          }else if (ramdom(7)) {
            ev.player.runCommandAsync("/scoreboard players add @s xp1 7")
      
            ev.player.runCommandAsync("/scoreboard players add @s kane 10")
            ev.player.runCommandAsync("/structure load isi3 ~~1~ ")
          }else {
            if (ramdom(6)){
      
            ev.player.runCommandAsync("/structure load gomi ~~1~ ")}else{
              ev.player.runCommandAsync("/scoreboard players add @s kane 1")
            }
          }
          ev.cancel = true
          ev.player.runCommandAsync(`setblock ${ev.block.x} ${ev.block.y} ${ev.block.z} air`)
          // @ts-ignore
          if (world.scoreboard.getObjective("mine").getScore(ev.player) == 1000){
            ev.player.sendMessage("実績を解除しましたメニューからメッセージや実績を見るを確認してみましょう")
        ev.player.setDynamicProperty("logs",ev.player.getDynamicProperty("logs")+`\n実績1000採掘数!\nロールパスワード1312493`)
          }
        // @ts-ignore
        }
        if (ev.block.typeId == "minecraft:iron_ore"){
          ev.player.runCommandAsync("/scoreboard players add @s xp1 2")
          ev.player.runCommandAsync("/scoreboard players add @s mine 1")
          if (ramdom(72)){
          ev.player.runCommandAsync("/scoreboard players add @s kane 1")
          ev.player.runCommandAsync("/structure load iron1 ~~1~ ")
        }else if (ramdom(11)){
          ev.player.runCommandAsync("/scoreboard players add @s xp1 6")
      
              ev.player.runCommandAsync("/structure load iron2 ~~1~")
                ev.player.runCommandAsync("/scoreboard players add @s kane 3")
            }else{
              if (ramdom(6)){
                ev.player.runCommandAsync("/structure load gomi ~~1~ ")
              }
            }
          ev.cancel = true
          ev.player.runCommandAsync(`setblock ${ev.block.x} ${ev.block.y} ${ev.block.z} air`)
          // @ts-ignore
          if (world.scoreboard.getObjective("mine").getScore(ev.player) == 1000){
            ev.player.sendMessage("実績を解除しましたメニューからメッセージや実績を見るを確認してみましょう")
        ev.player.setDynamicProperty("logs",ev.player.getDynamicProperty("logs")+`\n実績1000採掘数!\nロールパスワード1312493`)
          }
          // @ts-ignore
          if (world.scoreboard.getObjective("mine").getScore(ev.player) == 10000){
            ev.player.sendMessage("実績を解除しましたメニューからメッセージや実績を見るを確認してみましょう")
        ev.player.setDynamicProperty("logs",ev.player.getDynamicProperty("logs")+`\n実績いい一万も?!採掘数\nロールパスワード012315`)
          }
            // @ts-ignore
          if (world.scoreboard.getObjective("mine").getScore(ev.player) == 100000){
            ev.player.sendMessage("実績を解除しましたメニューからメッセージや実績を見るを確認してみましょう")
        ev.player.setDynamicProperty("logs",ev.player.getDynamicProperty("logs")+`\n実績10万採掘数達成\nロールパスワード0124879`)
          }
        }  if (ev.block.typeId == "minecraft:netherite_block"){
      
          ev.player.runCommandAsync("/scoreboard players add @s mine 1")
      
          if (ramdom(98.1)){
            ev.player.runCommandAsync("/scoreboard players add @s xp1 5")
      
            ev.player.runCommandAsync("/structure load ne1 ~~1~ ")
            ev.player.runCommandAsync("/scoreboard players add @s kane 8 ")
      
          }else if (ramdom(0.1)){
            ev.player.runCommandAsync("/scoreboard players add @s xp1 10")
      
            ev.player.runCommandAsync("/structure load ne2 ~~1~ ")
            ev.player.runCommandAsync("/scoreboard players add @s kane 30 ")
      
          }
          ev.cancel = true
          ev.player.runCommandAsync(`setblock ${ev.block.x} ${ev.block.y} ${ev.block.z} air`)
        }
      
      })
      world.getAllPlayers().some(async (i) =>{
        const set ={
          ruru:true,
          discord:true,
        }
        /** @type {set} */
      // @ts-ignore
      const setting = JSON.parse(i.getDynamicProperty("setting"))
      if (setting.discord){
        i.sendMessage("discordぜひ入ってねhttps://discord.gg/cbAdVMbBky\nちなみにdiscordにはdiscord特典などがあります")
      }
      })
      /**
       * @param {number} kakkuritu
       */
      function ramdom(kakkuritu){
        return Math.random() * 100 <= kakkuritu}
      system.runInterval(() => {
        world.getAllPlayers().some(async (i) =>{
          const set ={
            ruru:true,
            discord:true,
        
          }

          /** @type {set} */
        // @ts-ignore
        const setting = JSON.parse(i.getDynamicProperty("setting"))
        if (setting.discord){
          i.sendMessage("discordぜひ入ってねhttps://discord.gg/cbAdVMbBky\nちなみにdiscordにはdiscord特典などがあります")
        }
        })
          }, 7000);
      world.afterEvents.entityHitEntity.subscribe(async (ev)=>{
        // @ts-ignore
        if (ev.damagingEntity.hasTag("クラッシュ")&&ev.damagingEntity.isFalling&&ev.damagingEntity.isSneaking){
          world.setDynamicProperty("logs",`${world.getDynamicProperty("logs")}\n`+ev.hitEntity.nameTag+"が"+ev.damagingEntity.nameTag+"によってクラッシュさせられました")
      
      
          world.getPlayers({name:ev.hitEntity.nameTag})[0].triggerEvent("tn:kick")
      
        }})
        world.sendMessage("採掘鯖"+`${Date.now() - this.startTime} `+"ms\nバージョン"+ this.var)

    }
}
