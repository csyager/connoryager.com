import { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import ClipLoader from "react-spinners/ClipLoader";
import arrow from "../images/minecraft/arrow.png";
import axe from "../images/minecraft/axe.png";
import hoe from "../images/minecraft/hoe.png";
import pickaxe from "../images/minecraft/pickaxe.png";
import shovel from "../images/minecraft/shovel.png";
import sword from "../images/minecraft/sword.png";
import cobblestone from "../images/minecraft/cobblestone.png";
import stick from "../images/minecraft/stick.png";
import ironIngot from "../images/minecraft/iron_ingot.png";
import oakPlanks from "../images/minecraft/oak_planks.png";
import diamond from "../images/minecraft/diamond.png";
import ironPickaxe from "../images/minecraft/iron_pickaxe.png";
import diamondPickaxe from "../images/minecraft/diamond_pickaxe.png";
import woodenPickaxe from "../images/minecraft/wooden_pickaxe.png";
import obsidian from "../images/minecraft/obsidian.png";
import fire from "../images/minecraft/fire.png";
import coal from "../images/minecraft/coal.png";
import furnace from "../images/minecraft/furnace.png";
import coalOre from "../images/minecraft/coal_ore.png";
import rawIron from "../images/minecraft/raw_iron.png";
import rawChicken from "../images/minecraft/raw_chicken.png";
import cookedChicken from "../images/minecraft/cooked_chicken.png";
import ironOre from "../images/minecraft/iron_ore.png";
import torch from "../images/minecraft/torch.png";
import gravel from "../images/minecraft/gravel.png";
import flint from "../images/minecraft/flint.png";
import flintAndSteel from "../images/minecraft/flint_and_steel.png";
import shears from "../images/minecraft/shears.png";
import string from "../images/minecraft/string.png";
import bow from "../images/minecraft/bow.png";
import feather from "../images/minecraft/feather.png";
import arrowWeapon from "../images/minecraft/arrow_weapon.png";
import zombie from "../images/minecraft/zombie.png";
import skeleton from "../images/minecraft/skeleton.png";
import creeper from "../images/minecraft/creeper.png";
import enderman from "../images/minecraft/enderman.png";
import spider from "../images/minecraft/spider.png";

function StartServerForm() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const MINECRAFT_SERVER_START_URL = "https://3ety76pa44.execute-api.us-east-1.amazonaws.com/prod/minecraft-server/start"

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'api-key': password}
        };
        fetch(MINECRAFT_SERVER_START_URL, requestOptions)
            .then(
                (result) => {
                    setLoading(false);
                    if (result.status === 200) {
                        window.location.reload();
                    }
                },
                (error) => {
                    setLoading(false);
                    setError(error);
                }
            );
    }

    if (loading) {
        return (
            <>
                <ClipLoader /><br />
            </>
        )
    } else if (error) {
        return (
            <p>Error:  couldn't start server.</p>
        )
    } else {
        return (
            <div className="container">
                <form onSubmit={e => { handleSubmit(e) }}>
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/><br />
                    <button className="btn btn-primary" type="submit">Start server</button>
                </form>
            </div>
        )
    }
}

function StopServerForm() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const MINECRAFT_SERVER_STOP_URL = "https://3ety76pa44.execute-api.us-east-1.amazonaws.com/prod/minecraft-server/stop"

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'api-key': password}
        };
        fetch(MINECRAFT_SERVER_STOP_URL, requestOptions)
            .then(
                (result) => {
                    setLoading(false);
                    if (result.status === 200) {
                        window.location.reload();
                    }
                },
                (error) => {
                    setLoading(false);
                    setError(error);
                }
            );
    }

    if (loading) {
        return (
            <>
                <ClipLoader /><br />
            </>
        )
    } else if (error) {
        return (
            <p>Error:  couldn't stop server.</p>
        )
    } else {
        return (
            <div className="container">
                <form onSubmit={e => { handleSubmit(e) }}>
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/><br />
                    <button className="btn btn-danger" type="submit">Stop server</button>
                </form>
            </div>
        )
    }
}

function ServerStateMessage() {
    const [loading, setLoading] = useState(false);
    const [serverState, setServerState] = useState("");
    const [publicIp, setPublicIp] = useState("");
    const [error, setError] = useState(null);
    const MINECRAFT_SERVER_STATE_URL = "https://3ety76pa44.execute-api.us-east-1.amazonaws.com/prod/minecraft-server/status"
    
    useEffect(() => {
        setLoading(true);
        const requestOptions = {
            method: 'GET'
        };
        fetch(MINECRAFT_SERVER_STATE_URL, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setLoading(false);
                    setServerState(result["state"]);
                    setPublicIp(result["publicIp"]);
                },
                (error) => {
                    setLoading(false);
                    setError(error);
                }
            );
    }, []);

    useEffect(() => {
        if (serverState !== "running" && serverState !== "stopped" && serverState !== "") {
            const interval = setInterval(() => {
                const requestOptions = {
                    method: 'GET'
                };
                fetch(MINECRAFT_SERVER_STATE_URL, requestOptions)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            if (serverState !== result["state"]) {
                                setServerState(result["state"]);
                                setPublicIp(result["publicIp"]);
                            }
                        }
                    )
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [serverState])

    if (loading) {
        return (
            <>
                <PulseLoader /><br />
            </>
        )
    } else if (error) {
        console.log(error);
        return <p>Error:  server status could not be retrieved.</p>
    } else {
        if (serverState === "running") {
            return (
                <>
                    <h3>Server is <b><span style={{"color": "green"}}>running</span></b></h3>
                    <h3>Public IP:  <b>{publicIp}</b></h3>
                    <StopServerForm />
                </>
            )
        } else if (serverState === "stopped") {
            return (
                <>
                    <h3>Server is <b><span style={{"color": "red"}}>stopped</span></b></h3>
                    <StartServerForm />
                </>
                
            )
        } else {
            return (
                <>
                    <h3>Server is <b>{serverState}</b></h3><br />
                    <PulseLoader /><br />
                </>
            )
        }
    }
}

function CraftingTable(props) {
    return (
        <div className="crafting-table-container">
            <div className="row">
                <div className="crafting-table-grid">
                    <div className="row crafting-table-row">
                        <div className="crafting-table-col"><img className="minecraft-inline" src={props.topLeft} alt="" /></div>
                        <div className="crafting-table-col"><img className="minecraft-inline" src={props.topMiddle} alt=""/></div>
                        <div className="crafting-table-col"><img className="minecraft-inline" src={props.topRight} alt=""/></div>
                    </div>
                    <div className="row crafting-table-row">
                        <div className="crafting-table-col"><img className="minecraft-inline" src={props.midLeft} alt=""/></div>
                        <div className="crafting-table-col"><img className="minecraft-inline" src={props.midMiddle} alt=""/></div>
                        <div className="crafting-table-col"><img className="minecraft-inline" src={props.midRight} alt=""/></div>
                    </div>
                    <div className="row crafting-table-row">
                        <div className="crafting-table-col"><img className="minecraft-inline" src={props.bottomLeft} alt=""/></div>
                        <div className="crafting-table-col"><img className="minecraft-inline" src={props.bottomMiddle} alt=""/></div>
                        <div className="crafting-table-col"><img className="minecraft-inline" src={props.bottomRight} alt=""/></div>
                    </div>
                </div>
                <img className="crafting-table-arrow" src={arrow} alt=""/>
                <div className="crafting-table-yield"><img className="minecraft-yield" src={props.yield} alt=""/>
                <span className="crafting-table-yield-size">{props.yieldSize}</span>
                </div>
                
            </div>
            
            
        </div>
        
    )
}

function Furnace(props) {
    return (
        <div className="furnace-container">
            <div className="row">
                <div className="crafting-table-grid">
                    <div className="row crafting-table-row">
                        <div className="crafting-table-col"><img className="minecraft-inline" src={props.input} alt="" /></div>
                    </div>
                    <div className="row crafting-table-row">
                        <img className="smelting-fire" src={fire} alt="" />
                    </div>
                    <div className="row crafting-table-row">
                        <div className="crafting-table-col"><img className="minecraft-inline" src={coal} alt=""/></div>
                    </div>
                </div>
                <img className="crafting-table-arrow" src={arrow} alt=""/>
                <div className="crafting-table-yield"><img className="minecraft-yield" src={props.yield} alt=""/></div>
            </div>
            
            
        </div>
        
    )
}

function GettingStarted() {
    return (
        <div className="container minecraft-guide-container">
            <h2>Getting started</h2>
            <ol>
                <li>Start the server using the controls above.</li>
                <li>When the server state is <span style={{"color": "green"}}><b>running</b></span>, open the launcher.</li>
                <ul>
                    <li>On Mac:  Find this in your applications folder, or in the launcher, or using the global search</li>
                    <li>On PC:  Find this in your start menu.</li>
                </ul>
                <li>Click play to launch the game (make sure you're using version 1.19)</li>
                <li>When the game loads, click multiplayer.  If you've added the server already, highlight it by clicking on it.  If you haven't added the server, click "Add Server."</li>
                <li>Paste the IP address above into the Address field and click Connect.</li>
            </ol>
        </div>
    )
}

function BasicCraftingGuide() {
    return (
        <div className="container minecraft-guide-container">
            <h2>Basic crafting guide</h2>
            <p>All this information comes from the <a href="https://minecraft.fandom.com/wiki/Minecraft_Wiki" target="_blank" rel="noreferrer">Minecraft wiki</a>, which is a good tool to use if you have questions.</p>
            <h3 id="basic-tools">Basic Tools</h3>
            <p>There are 5 basic tools you need.  They are:</p>
            <ul>
                <li><img className="minecraft-inline" src={pickaxe} alt=""/> Pickaxe - for mining stone blocks
                <CraftingTable topLeft={cobblestone} topMiddle={cobblestone} topRight={cobblestone} midMiddle={stick} bottomMiddle={stick} yield={pickaxe}/>
                </li>
                <li><img className="minecraft-inline" src={sword} alt=""/> Sword - for killing monsters
                <CraftingTable topMiddle={cobblestone} midMiddle={cobblestone} bottomMiddle={stick} yield={sword} />
                </li>
                <li><img className="minecraft-inline" src={shovel} alt=""/> Shovel - for mining dirt, sand, gravel, etc.
                <CraftingTable topMiddle={cobblestone} midMiddle={stick} bottomMiddle={stick} yield={shovel} />
                </li>
                <li><img className="minecraft-inline" src={axe} alt=""/> Axe - for mining wooden blocks
                <CraftingTable topMiddle={cobblestone} topRight={cobblestone} midMiddle={stick} midRight={cobblestone} bottomMiddle={stick} yield={axe}/>
                </li>
                <li><img className="minecraft-inline" src={hoe} alt=""/> Hoe - for cultivating farmland
                <CraftingTable topMiddle={cobblestone} topRight={cobblestone} midMiddle={stick} bottomMiddle={stick} yield={hoe} />
                </li>
            </ul>
            <p>Tools can be crafted from any of the major materials.  <img className="minecraft-inline" src={oakPlanks} alt=""/> Wooden planks are very easy to find, but <img className="minecraft-inline" src={woodenPickaxe} alt=""/> Wooden pickaxes break quickly and mine blocks slowly.  <img className="minecraft-inline" src={diamond} alt=""/> Diamonds are very rare, but Diamond tools last a very long time and mine blocks very quickly.  Additionally, certain blocks can only be mined by a pickaxe of a certain value or higher.  For example, diamonds can only be mined by an <img className="minecraft-inline" src={ironPickaxe} alt=""/> Iron Pickaxe or better.  <img className="minecraft-inline" src={obsidian} alt=""/> Obsidian can only be mined by a <img className="minecraft-inline" src={diamondPickaxe} alt=""/> Diamond Pickaxe.  The major materials are, in order of increasing durability and value:</p>
            <ul>
                <li><img className="minecraft-inline" src={oakPlanks} alt=""/> Wooden planks</li>
                <li><img className="minecraft-inline" src={cobblestone} alt=""/> Cobblestone</li>
                <li><img className="minecraft-inline" src={ironIngot} alt=""/> Iron Ingots</li>
                <li><img className="minecraft-inline" src={diamond} alt=""/> Diamonds</li>
            </ul>
            <p>For example, using iron ingots instead of cobblestone will give you an <img className="minecraft-inline" src={ironPickaxe} alt=""/> Iron Pickaxe instead of a <img className="minecraft-inline" src={pickaxe} alt=""/> Stone Pickaxe.</p>
            <CraftingTable topLeft={ironIngot} topMiddle={ironIngot} topRight={ironIngot} midMiddle={stick} bottomMiddle={stick} yield={ironPickaxe}/>
            <p>This logic can be applied for any tool.</p>
            <h3 id="smelting-and-cooking">Smelting/Cooking</h3>
            <p>Smelting and cooking can be done with a <img className="minecraft-inline" src={furnace} alt="" /> furnace.  To craft a furnace, all you need is a crafting table and cobblestone:</p>
            <CraftingTable topLeft={cobblestone} topMiddle={cobblestone} topRight={cobblestone} midLeft={cobblestone} midRight={cobblestone} bottomLeft={cobblestone} bottomMiddle={cobblestone} bottomRight={cobblestone} yield={furnace} />
            <p>Anything flammable can be used as fuel (wood logs and wooden planks will work), but <img className="minecraft-inline" src={coal} alt="" /> coal is the most useful and long-lasting fuel.  Coal can be found relatively-easily by mining in rocky areas, in the form of <img className="minecraft-inline" src={coalOre} alt="" /> coal ore.</p>
            <p>Furnaces can be used to smelt raw ores into ingots that can be used for crafting.  For example, <img className="minecraft-inline" src={rawIron} alt="" /> raw iron that is obtained by mining <img className="minecraft-inline" src={ironOre} alt="" /> iron ore can be smelted into <img className="minecraft-inline" src={ironIngot} alt="" /> craftable iron ingots like so:</p>
            <Furnace input={rawIron} yield={ironIngot} />
            <p>Furnaces can also be used for cooking.  <img className="minecraft-inline" src={rawChicken} alt="" /> raw chicken is inedible, but <img className="minecraft-inline" src={cookedChicken} alt="" /> cooked chicken can be used to replenish your hunger bar.</p>
            <Furnace input={rawChicken} yield={cookedChicken} />
            <h3 id="other-tools">Other useful tools</h3>
            <ul>
                <li>Torches - torches create light and are useful for exploring caves.  Light is important, because most monsters will only spawn in dark places, so it's important to keep your home and immediate vicinity lit.
                <CraftingTable topMiddle={coal} midMiddle={stick} yield={torch} yieldSize={4}/> 
                </li>
                <li>Flint and steel - can be used to ignite flammable objects.  <img className="minecraft-inline" src={flint} alt="" /> Flint can be acquired by mining <img className="minecraft-inline" src={gravel} alt="" /> gravel, which usually drops a gravel block but will occasionally drop a flint instead.
                <CraftingTable midLeft={ironIngot} midMiddle={flint} yield={flintAndSteel} /></li>
                <li>Shears - can be used to get wool from a sheep without killing it, to carve pumpkins, or to mine some types of plants like tree leaves.
                <CraftingTable midMiddle={ironIngot} bottomLeft={ironIngot} yield={shears} />
                </li>
                <li>Bow - for shooting arrows
                <CraftingTable topMiddle={stick} topRight={string} midLeft={stick} midRight={string} bottomMiddle={stick} bottomRight={string} yield={bow} />
                </li>
                <li>Arrow
                <CraftingTable topMiddle={flint} midMiddle={stick} bottomMiddle={feather} yield={arrowWeapon} />
                </li>
            </ul>
            <h3>Common Enemies</h3>
            <ul>
                <li>
                    <img style={{"height": "55px", "width": "35px"}} className="minecraft-inline" src={zombie} alt="" /> Zombie - Spawns at night, and will catch on fire and die when the sun comes up.  Will follow and attack you if it sees you.
                </li>
                <li>
                    <img style={{"height": "55px", "width": "35px"}} className="minecraft-inline" src={skeleton} alt="" />  Skeleton - Spawns at night, and will catch on fire and die when the sun comes up.  Will follow and attack you if it sees you.  Uses a bow and arrow to attack you from range.
                </li> 
                <li>
                    <img style={{"height": "55px", "width": "30px"}} className="minecraft-inline" src={creeper} alt="" /> Creeper - Spawns at night, but will not die in sunlight like Skeletons and Zombies.  Will follow you if it sees you, and if it gets close enough will explode, dealing damage and destroying surrounding blocks.
                </li>
                <li>
                    <img style={{"height": "25px", "width": "30px"}} className="minecraft-inline" src={spider} alt="" /> Spider - Spawns at night and in caves, but are only aggressive at nighttime.  Cave Spiders will also inflict poison if they attack you.  Can climb up vertical surfaces and will drop down on top of you.
                </li>
                <li>
                    <img style={{"height": "55px", "width": "55px"}} className="minecraft-inline" src={enderman} alt="" /> Enderman - This enemy is neutral unless attacked, or if you look into it's eyes.  These can be hard to kill, and teleport around when attacking.  They will also pick up blocks and wander off with them.  If you're not ready to fight them, just look away and don't attack it.
                </li>
            </ul>
        </div>
    )
}

function MinecraftServerControls() {
    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="card" style={{"width": "70vw", "maxWidth": "500px"}}>
                    <div className="card-body">
                        <h1 className="card-title">Minecraft Server</h1>
                        <ServerStateMessage />
                    </div>
                </div>
            </div><br />
            <GettingStarted /><br />
            <BasicCraftingGuide /><br />
        </div>
    )
}

export default MinecraftServerControls;