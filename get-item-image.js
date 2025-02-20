const { 
  Collection
} = require('discord.js');

module.exports = {
  getItemImage: (item_name) => {
    let image_url;

    const item_images = new Collection([
      ["abyssal grace charm", 'https://tlcodex.com/icons/icon/item_128/equip/acc/it_p_bracelet_00018.webp'],
      ["abyssal grace pendant", 'https://tlcodex.com/icons/icon/item_128/equip/acc/it_p_necklace_00015.webp'],
      ["adentus's gargantuan greatsword", 'https://tlcodex.com/icons/icon/item_128/equip/weapon/it_p_sword2h_00039.webp'],
      ["aelon's rejuvenating longbow", 'https://tlcodex.com/icons/icon/item_128/equip/weapon/it_p_bow_00034.webp'],
      ["ahzreil's siphoning sword", 'https://tlcodex.com/icons/icon/item_128/equip/weapon/it_p_sword_00026.webp'],
      ["arcane shadow gloves", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_fa_m_gl_00005b.webp'],
      ["arcane shadow hat", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_fa_m_hm_00022.webp'],
      ["arcane shadow pants", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_fa_m_pt_00023.webp'],
      ["arcane shadow robes", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_fa_m_ts_00023.webp'],
      ["arcane shadow shoes", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_fa_m_bt_06001.webp'],
      ["aridus's gnarled voidstaff", 'https://tlcodex.com/icons/icon/item_128/equip/weapon/it_p_staff_00033.webp'],
      ["ascended guardian hood", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_fa_m_hm_00011a.webp'],
      ["ascended guardian pants", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_fa_m_pt_00005b.webp'],
      ["ascended guardian raiment", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_fa_m_ts_00010.webp'],
      ["ascended guardian shoes", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_fa_m_bt_00011.webp'],
      ["band of universal power", 'https://tlcodex.com/icons/icon/item_128/equip/acc/it_p_ring_00005.webp'],
      ["belt of bloodlust", 'https://tlcodex.com/icons/icon/item_128/equip/acc/it_p_belt_00022.webp'],
      ["bile drenched veil", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_m_ca_00013.webp'],
      ["blessed templar choker", 'https://tlcodex.com/icons/icon/item_128/equip/acc/it_p_necklace_00003.webp'],
      ["blessed templar cloak", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_m_ca_00019.webp'],
      ["blessed templar helmet", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_part_pl_m_hm_00016.webp'],
      ["blessed templar plate", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_part_pl_m_ts_00015.webp'],
      ["boots of the executioner", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_fa_m_bt_00022.webp'],
      ["breeches of the executioner", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_le_m_pt_00022a.webp'],
      ["chernobog's blade of beheading", 'https://tlcodex.com/icons/icon/item_128/equip/weapon/it_p_sword_00033.webp'],
      ["clasp of the overlord", 'https://tlcodex.com/icons/icon/item_128/equip/acc/it_p_necklace_00019.webp'],
      ["collar of decimation", 'https://tlcodex.com/icons/icon/item_128/equip/acc/it_p_necklace_00001.webp'],
      ["cornelius's animated edge", 'https://tlcodex.com/icons/icon/item_128/equip/weapon/it_p_sword_00008a.webp'],
      ["divine justiciar attire", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_fa_m_ts_06001.webp'],
      ["divine justiciar gloves", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_fa_m_gl_06001.webp'],
      ["divine justiciar pants", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_fa_m_pt_00022.webp'],
      ["divine justiciar shoes", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_pl_m_bt_00014a.webp'],
      ["ebon roar gauntlets", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_pl_m_gl_05001.webp'],
      ["embossed granite band", 'https://tlcodex.com/icons/icon/item_128/equip/acc/it_p_ring_00014.webp'],
      ["excavator's mysterious scepter", 'https://tlcodex.com/icons/icon/item_128/equip/weapon/it_p_wand_00012.webp'],
      ["forged golden bangle", 'https://tlcodex.com/icons/icon/item_128/equip/acc/it_p_bracelet_00013.webp'],
      ["forsaken embrace", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_m_ca_00017.webp'],
      ["gauntlets of the field general", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_pl_m_gl_00018.webp'],
      ["gilded infernal wristlet", 'https://tlcodex.com/icons/icon/item_128/equip/acc/it_p_bracelet_00008.webp'],
      ["gilded raven grips", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_le_m_gl_00022b.webp'],
      ["gilded raven mask", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_le_m_hm_00012a.webp'],
      ["gilded raven trousers", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_le_m_pt_00022b.webp'],
      ["girdle of spectral skulls", 'https://tlcodex.com/icons/icon/item_128/equip/acc/it_p_belt_00021.webp'],
      ["greaves of the field general", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_pl_m_pt_00018.webp'],
      ["helm of the field general", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_pl_m_hm_00018.webp'],
      ["heroic breeches of the resistance", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_part_le_m_pt_00004a.webp'],
      ["junobote's juggernaut warblade", 'https://tlcodex.com/icons/icon/item_128/equip/weapon/it_p_sword2h_00039.webp'],
      ["junobote's smoldering ranseur", 'https://tlcodex.com/icons/icon/item_128/equip/weapon/it_p_spear_00021.webp'],
      ["kowazan's sunflare crossbows", 'https://tlcodex.com/icons/icon/item_128/equip/weapon/it_p_crossbow_00035.webp'],
      ["kowazan's twilight daggers", 'https://tlcodex.com/icons/icon/item_128/equip/weapon/it_p_dagger_00037.webp'],
      ["malakar's energizing crossbows", 'https://tlcodex.com/icons/icon/item_128/equip/weapon/it_p_crossbow_00034.webp'],
      ["minzerok's daggers of crippling", 'https://tlcodex.com/icons/icon/item_128/equip/weapon/it_p_dagger_00039.webp'],
      ["morokai's greatblade of corruption", 'https://tlcodex.com/icons/icon/item_128/equip/weapon/it_p_sword2h_00027.webp'],
      ["nirma's sword of echoes", 'https://tlcodex.com/icons/icon/item_128/equip/weapon/it_p_sword_00035.webp'],
      ["phantom wolf boots", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_part_le_m_bt_00005.webp'],
      ["phantom wolf gloves", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_part_le_m_gl_00001b.webp'],
      ["phantom wolf mask", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_part_le_m_hm_00005.webp'],
      ["sabatons of the field general", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_pl_m_bt_00018.webp'],
      ["shadow harvester boots", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_part_le_m_bt_00002.webp'],
      ["shadow harvester grips", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_le_m_gl_00017a.webp'],
      ["shadow harvester mask", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_part_le_m_hm_00008.webp'],
      ["shadow harvester trousers", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_part_le_m_pt_00007.webp'],
      ["shock commander gauntlets", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_pl_m_gl_05002.webp'],
      ["shock commander greaves", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_pl_m_pt_05002.webp'],
      ["shock commander sabatons", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_pl_m_bt_05002.webp'],
      ["shock commander visor", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_pl_m_hm_05002.webp'],
      ["swirling essence gloves", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_fa_m_gl_00020.webp'],
      ["swirling essence hat", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_fa_m_hm_05001.webp'],
      ["swirling essence pants", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_part_fa_m_pt_00003.webp'],
      ["swirling essence robe", 'https://tlcodex.com/icons/icon/item_128/equip/armor/p_set_fa_m_ts_05001.webp'],
      ["talus's crystalline staff", 'https://tlcodex.com/icons/icon/item_128/equip/weapon/it_p_staff_00032.webp'],
      ["wrapped coin necklace", 'https://tlcodex.com/icons/icon/item_128/equip/acc/it_p_necklace_00006.webp'],
    ]);

    image_url = item_images.find((value, key) => key.toLowerCase() === item_name.toLowerCase());
    if (image_url === undefined) {
      return null;
    }

    const image_embed = {
      title: item_name,
      image: {
        url: image_url
      },
    };

    return image_embed;
  },
};