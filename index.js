//@ts-check
import { EntitySkinIdComponent, ScriptEventCommandMessageAfterEvent, system, world ,EquipmentSlot} from "@minecraft/server";//インポート
import {main} from "./main"
const addon = new main()
    addon.setver(2.1)
    addon.run()
