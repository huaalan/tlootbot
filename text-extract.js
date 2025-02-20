
module.exports = {
  textExtract: (text_lines) => {
    let title;
    let trait;

    text_lines
      .filter((l) => l.length > 1)
      .forEach((l, idx, text) => {
        const type_regex =
          /(head|cloak|chest|hands|legs|feet|greatsword|sword|daggers|crossbows|longbow|staff|wand|spear|necklace|belt|ring|bracelet)/i;
        const trait_regex = /trait/i;
        const epic_regex = /epic/i;
        const def_regex = /(melee defense|ranged defense|magic defense)/i;

        if (l.search(epic_regex) > -1 && title == null) {
          // We can possibly find the title 2 lines after this
          title = text[idx + 2]
        } else if (l.search(def_regex) > -1 && title == null) {
          // We can possibly find the title 1 line before this
          title = text[idx - 1]
        } else if (l.search(type_regex) > -1 && title == null) {
          // We can possibly find the title 1 line after this
          title = text[idx + 1];
        }
        
        if (l.search(trait_regex) > -1 && trait == null) {
          // We can find the trait in the line after this
          // and remove any non alpha characters
          trait = text[idx + 1];
        }
      });

    return {
      title: title.replace(/[\W\d](?![\w\s\w])/g, ""),
      trait: trait.replace(/[\W\d](?!\w+\s+\w)/g, ""),
    };
  },
};