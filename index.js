//@ts-check
/**
 * MTI RITUTO (c)
 * discord rituto135877 <@1139508960693604393>
 */
import { EntitySkinIdComponent, ScriptEventCommandMessageAfterEvent, system, world ,} from "@minecraft/server";//インポート
import { from } from "./menu";
//プレイヤーがチャットしたとき
world.beforeEvents.chatSend.subscribe(async(ev) => {
  const  { message,sender} = ev
});
//アイテムがクリックされた時
world.afterEvents.itemUse.subscribe(async (ev) => {
  //ネザースターだった場合はメニュー01に飛ばす
  if (ev.itemStack.typeId == "minecraft:nether_star") new from(ev.source).menu01("")
  ネザースターだったら処理を終わる
  if (ev.itemStack.typeId == "minecraft:nether_star") return
})
world.beforeEvents.itemUse.subscribe(async (ev) =>{
  //採掘速度アップのエンダーパール
if (ev.itemStack.typeId == "minecraft:ender_pearl"){
  ev.cancel = true
  //採掘速度上昇(lv:1 30秒)投げて使いますの時に実行
  if (ev.itemStack.nameTag =="採掘速度上昇(lv:1 30秒)投げて使います")
  {
    ev.source.runCommandAsync("clear @s ender_pearl 0 1")
    ev.source.runCommandAsync("/effect @s haste 30 1 true")
  }else
    //上と同じ
  if (ev.itemStack.nameTag =="採掘速度上昇(lv:2 30秒)投げて使います")
  {
    ev.source.runCommandAsync("clear @s ender_pearl 0 1")
    ev.source.runCommandAsync("/effect @s haste 30 2 true")
  }
}
})
//プレイヤーごとに実行
system.runInterval(async function (){
 world.getDimension("overworld").runCommandAsync("/scoreboard players set 参加人数 game 0")
  if (!world.getDynamicProperty("logs")) world.setDynamicProperty("logs","")
world.getAllPlayers().forEach(async (player) =>{
  if (!player.getDynamicProperty("logs")) player.setDynamicProperty("logs","")
  if (!player.getDynamicProperty("ginko")) player.setDynamicProperty("ginko",0)
  world.getDimension("overworld").runCommandAsync("/scoreboard players add 参加人数 game 1")
  //titleで所持金を表示
  // @ts-ignore
  player.runCommandAsync(`/title @s actionbar 所持金:${world.scoreboard.getObjective("kane").getScore(player)}G\ue102\n採掘数:${world.scoreboard.getObjective("mine").getScore(player)}`)
})
})
//採掘
world.beforeEvents.playerBreakBlock.subscribe(async (ev) =>{
  //ramdom(80)は約80%
    //ramdom(23)は約23%

  if (ev.block.typeId == "minecraft:stone"){
    ev.player.runCommandAsync("/scoreboard players add @s mine 1")
    if (ramdom(80)){
    ev.player.runCommandAsync("/scoreboard players add @s kane 1")
    ev.player.runCommandAsync("/structure load isi1 ~~1~ ")}else if (ramdom(14)){
      ev.player.runCommandAsync("/scoreboard players add @s kane 2")
      ev.player.runCommandAsync("/structure load isi2 ~~1~ ")
    }else if (ramdom(7)) {
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
      //実績
      ev.player.sendMessage("実績を解除しましたメニューからメッセージや実績を見るを確認してみましょう")
  ev.player.setDynamicProperty("logs",ev.player.getDynamicProperty("logs")+`\n実績1000採掘数!`)
    }
  // @ts-ignore
  }
  if (ev.block.typeId == "minecraft:iron_ore"){
    ev.player.runCommandAsync("/scoreboard players add @s mine 1")
    if (ramdom(72)){
    ev.player.runCommandAsync("/scoreboard players add @s kane 1")
    ev.player.runCommandAsync("/structure load iron1 ~~1~ ")
  }else if (ramdom(11)){
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
  ev.player.setDynamicProperty("logs",ev.player.getDynamicProperty("logs")+`\n実績1000採掘数!`)
    }
    // @ts-ignore
    if (world.scoreboard.getObjective("mine").getScore(ev.player) == 10000){
      ev.player.sendMessage("実績を解除しましたメニューからメッセージや実績を見るを確認してみましょう")
  ev.player.setDynamicProperty("logs",ev.player.getDynamicProperty("logs")+`\n実績いい一万も?!採掘数`)
    }
      // @ts-ignore
    if (world.scoreboard.getObjective("mine").getScore(ev.player) == 100000){
      ev.player.sendMessage("実績を解除しましたメニューからメッセージや実績を見るを確認してみましょう")
  ev.player.setDynamicProperty("logs",ev.player.getDynamicProperty("logs")+`\n実績10万採掘数達成`)
    }
  }  if (ev.block.typeId == "minecraft:netherite_block"){
    ev.player.runCommandAsync("/scoreboard players add @s mine 1")

    if (ramdom(98.1)){
      ev.player.runCommandAsync("/structure load ne1 ~~1~ ")
      ev.player.runCommandAsync("/scoreboard players add @s kane 8 ")

    }else if (ramdom(0.1)){
      ev.player.runCommandAsync("/structure load ne2 ~~1~ ")
      ev.player.runCommandAsync("/scoreboard players add @s kane 30 ")

    }
    ev.cancel = true
    ev.player.runCommandAsync(`setblock ${ev.block.x} ${ev.block.y} ${ev.block.z} air`)
  }
})

/**
 * @param {number} kakkuritu
 */
function ramdom(kakkuritu){
  return Math.random() * 100 <= kakkuritu}
system.runInterval(() => {
  world.sendMessage(`discordぜひ入ってねhttps://discord.gg/cbAdVMbBky`)
    }, 7000);
