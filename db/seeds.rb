# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# require_relative './generate.rb'
require 'open-uri'

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Game.destroy_all
    CartItem.destroy_all
    Review.destroy_all
    
    # this line destroys all relationships and also remove files from AWS
    # ActiveStorage::Attachment.where(record_type: "Game", name: "images").find_each do |attachment|
    #   attachment.purge
    # end
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('games')
    ApplicationRecord.connection.reset_pk_sequence!('cart_items')
    ApplicationRecord.connection.reset_pk_sequence!('reviews')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'admin', 
      email: 'lineage2@ukr.net', 
      password: 'password'
    )
  
    # More users
    10.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    # demo user
    User.create!(
      username: 'DemoUser', 
      email: 'demo@user.com', 
      password: 'password'
    )

    # =================================== games ===================================

    puts "Creating games..."

    Game.create!(
      title: "The Witcher 3: Wild Hunt",
      genre: "RPG",
      details: "You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, 
      monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, 
      a living weapon that can alter the shape of the world.",

      description: "You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested 
      continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, a living 
      weapon that can alter the shape of the world.

      Updated to the latest version, The Witcher 3: Wild Hunt comes with new features and items, including a 
      built-in Photo Mode, swords, armor, and alternate outfits inspired by The Witcher Netflix series — and more! 
      Behold the dark fantasy world of the Continent like never before! This edition of The Witcher 3: Wild Hunt has 
      been enhanced with numerous visual and technical improvements, including vastly improved level of detail, a range 
      of community created and newly developed mods for the game, real-time ray tracing, and more — all implemented 
      with the power of modern PCs in mind. Trained from early childhood and mutated to gain superhuman skills, strength, 
      and reflexes, witchers are a counterbalance to the monster-infested world in which they live.
      • Gruesomely destroy foes as a professional monster hunter armed with a range of upgradeable weapons, mutating 
      potions, and combat magic.
      • Hunt down a wide variety of exotic monsters, from savage beasts prowling mountain passes to cunning supernatural 
      predators lurking in the shadowy back alleys of densely populated cities.
      • Invest your rewards to upgrade your weaponry and buy custom armor, or spend them on horse races, card games, fist 
      fighting, and other pleasures life brings.",

      release_date: Date.parse('May 18, 2015'),
      developer: "CD PROJEKT RED",
      publisher: "CD PROJEKT RED",
      price: 39.99
    )

    

    # ===============================================================================================================
    
    Game.create!(
      title: "Darkest Dungeon II",
      genre: "RPG",
      details: "Darkest Dungeon II is a roguelike road trip of the damned. 
                Form a party, equip your stagecoach, and set off across the decaying 
                landscape on a last gasp quest to avert the apocalypse. The greatest 
                dangers you face, however, may come from within...",

      description: "Darkest Dungeon II is a roguelike road trip of the damned. Form a party, equip your stagecoach, 
      and set off across the decaying landscape on a last gasp quest to avert the apocalypse. The greatest dangers you 
      face, however, may come from within...

                    Gather your courage and ride out into the chaos of a world undone.
                    Four heroes and a stagecoach are all that stand between darkness and salvation.
                    
                    Tried and True Turn-based Combat, Improved
                    The ground-breaking genre-defining combat from Darkest Dungeon returns, but everything from 
                    stats to rules has been refined and improved. The all new Token System helps make your decisions 
                    impactful while adding even more depth of play.",
                    
      release_date: Date.parse('May 8, 2023'),
      developer: "Red Hook Studios",
      publisher: "Red Hook Studios",
      price: 39.99
    )

    # ===============================================================================================================

    Game.create!(
      title: "Resident Evil 4",
      genre: "Action",
      details: "Survival is just the beginning. Six years have passed since the biological 
                disaster in Raccoon City. Leon S. Kennedy, one of the survivors, tracks the 
                president's kidnapped daughter to a secluded European village, where there 
                is something terribly wrong with the locals.",

      description: "Survival is just the beginning.

                    Six years have passed since the biological disaster in Raccoon City.
                    Agent Leon S. Kennedy, one of the survivors of the incident, has been sent to rescue the president's 
                    kidnapped daughter.
                    He tracks her to a secluded European village, where there is something terribly wrong with the locals.
                    And the curtain rises on this story of daring rescue and grueling horror where life and death, terror 
                    and catharsis intersect.
      
                    Featuring modernized gameplay, a reimagined storyline, and vividly detailed graphics,
                    Resident Evil 4 marks the rebirth of an industry juggernaut.
      
                    Relive the nightmare that revolutionized survival horror.",

      release_date: Date.parse('Mar 23, 2023'),
      developer: "CAPCOM Co., Ltd.",
      publisher: "CAPCOM Co., Ltd.",
      price: 59.99
    )

    # ===============================================================================================================

    Game.create!(
      title: "Lost Ark",
      genre: "Free to Play",
      details: "Embark on an odyssey for the Lost Ark in a vast, vibrant world: explore new lands, 
                seek out lost treasures, and test yourself in thrilling action combat in this 
                action-packed free-to-play RPG.",

      description: "Embark on an odyssey for the Lost Ark in a vast, vibrant world: 
                    explore new lands, seek out lost treasures, and test yourself in thrilling action combat. 
                    Define your fighting style with your class and advanced class, and customize your skills, 
                    weapons, and gear to bring your might to bear as you fight against hordes of enemies, colossal 
                    bosses, and dark forces seeking the power of the Ark in this action-packed free-to-play RPG.
                    Explore seven vast, varied continents and the seas between them to find vibrant cultures, 
                    strange and fantastical beasts, and all the unexpected marvels waiting to be discovered. 
                    Delve into the secrets of Arkesia, prove your might in battles and raids, compete against 
                    other players in PvP, travel to distant islands in search of hidden riches, face packs of 
                    enemies and colossal bosses in the open world, and more.",

      release_date: Date.parse('Feb 11, 2022'),
      developer: "Smilegate RPG",
      publisher: "Amazon Games",
      price: 0
    )
    # ===============================================================================================================

    Game.create!(
      title: "Ori and the Will of the Wisps",
      genre: "Action",
      details: "Play the critically acclaimed masterpiece. Embark on a new journey in a vast, exotic world where 
      you'll encounter towering enemies and challenging puzzles on your quest to unravel Ori's destiny.",

      description: "ORI AND THE WILL OF THE WISPS IS A MUST PLAY*:
      • 98/100 GAMESBEAT “…an exhilarating, emotional masterpiece”
      • 9.5/10 GAMEINFORMER “the story is fantastic, the world is breathtaking”
      • 9/10 IGN “the best praise you can give a sequel”
      • 9.5/10 DESTRUCTOID “An early defining moment of the decade to come”
      • 90/100 GAMERS HEROES “Ori and the Will of the Wisps is a game of passion, made from the heart.”
      • 9/10 PRESS START AUS “its final act will fill your heart and have it bursting with joie de vivre.”
      • 9/10 AUS GAMERS
      • 9/10 EUROGAMER ITALY
      • 91/100 GAMESTAR.DE
      • 90/100 ATOMIX
      • 5/5 HARDCORE GAMER
      • 9.4/10 VANDAL
      • 9/10 VIDEOGAMER
      • 5/5 DAILY STAR : “a finely-crafted, emotional masterpiece that elevates the Metroidvania genre
      • 9.2/10 MERISTATION
      • 9/10 GAMESPEW “Ori and the Will of the Wisps is perhaps the most beautiful game I have ever played.”
      • 9.8/10 THE GAMES MACHINE
      • 4.5/5 SCREEN RANT “A Spectacular Sequel”
      • 9.5/10 EASYALLIES “It's an exceptional game that you don't want to miss.”
      • 9.2/10 GAMERSKY
      • 4.5/5 TWINFINITE “A Magical Metroidvania Adventure”
      • 94/100 COGconnected
      *Review scores and quotes reference Windows PC and/or console versions of the game. Source Metacritic.com 03/17/2020
      The little spirit Ori is no stranger to peril, but when a fateful flight puts the owlet Ku in harm's way, 
      it will take more than bravery to bring a family back together, heal a broken land, and discover Ori's true 
      destiny. From the creators of the acclaimed action-platformer Ori and the Blind Forest comes the highly anticipated sequel. 
      Embark on an all-new adventure in a vast world filled with new friends and foes that come to life in stunning, 
      hand-painted artwork. Set to a fully orchestrated original score, Ori and the Will of the Wisps continues the Moon Studios 
      tradition of tightly crafted platforming action and deeply emotional storytelling.",

      release_date: Date.parse('Mar 11, 2020'),
      developer: "Moon Studios GmbH",
      publisher: "Xbox Game Studios",
      price: 29.99
    )
    # ===============================================================================================================

    Game.create!(
      title: "Stardew Valley",
      genre: "Indie",
      details: "You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools 
      and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown 
        fields into a thriving home?",

      description: "You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down 
      tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these 
        overgrown fields into a thriving home? It won't be easy. Ever since Joja Corporation came to town, the old 
        ways of life have all but disappeared. The community center, once the town's most vibrant hub of activity, 
        now lies in shambles. But the valley seems full of opportunity. With a little dedication, you might just be 
        the one to restore Stardew Valley to greatness!
      Features
      Turn your overgrown field into a lively farm! Raise animals, grow crops, start an orchard, craft useful machines, 
      and more! You'll have plenty of space to create the farm of your dreams.
      4 Player Farming! Invite 1-3 players to join you in the valley online! Players can work together to build a 
      thriving farm, share resources, and improve the local community. As more hands are better than one, players 
      have the option to scale profit margin on produce sold for a more challenging experience.
      Improve your skills over time. As you make your way from a struggling greenhorn to a master farmer, you'll 
      level up in 5 different areas: farming, mining, combat, fishing, and foraging. As you progress, you'll learn 
      new cooking and crafting recipes, unlock new areas to explore, and customize your skills by choosing from a 
      variety of professions.
      Become part of the local community. With over 30 unique characters living in Stardew Valley, you won't have 
      a problem finding new friends! Each person has their own daily schedule, birthday, unique mini-cutscenes, 
      and new things to say throughout the week and year. As you make friends with them, they will open up to you, 
      ask you for help with their personal troubles, or tell you their secrets! Take part in seasonal festivals 
      such as the luau, haunted maze, and feast of the winter star.",

      release_date: Date.parse('Feb 26, 2016'),
      developer: "ConcernedApe",
      publisher: "ConcernedApe",
      price: 14.99
    )

     # ===============================================================================================================

     Game.create!(
      title: "Inscryption",
      genre: "Indie",
      details: "Inscryption is an inky black card-based odyssey that blends the deckbuilding roguelike, 
      escape-room style puzzles, and psychological horror into a blood-laced smoothie. Darker still are the 
      secrets inscrybed upon the cards...",

      description: "From the creator of Pony Island and The Hex comes the latest mind melting, self-destructing 
      love letter to video games. Inscryption is an inky black card-based odyssey that blends the deckbuilding 
      roguelike, escape-room style puzzles, and psychological horror into a blood-laced smoothie. Darker still 
      are the secrets inscrybed upon the cards...
      In Inscryption you will...
      Acquire a deck of woodland creature cards by draft, surgery, and self mutilation
      Unlock the secrets lurking behind the walls of Leshy's cabin
      Embark on an unexpected and deeply disturbing odyssey",

      release_date: Date.parse('Oct 19, 2021'),
      developer: "Daniel Mullins Games",
      publisher: "Devolver Digital",
      price: 19.99
    )

     # ===============================================================================================================

     Game.create!(
      title: "Sekiro: Shadows Die Twice",
      genre: "Action",
      details: "Game of the Year - The Game Awards 2019 Best Action Game of 2019 - IGN Carve your own clever 
      path to vengeance in the award winning adventure from developer FromSoftware, creators of Bloodborne and 
      the Dark Souls series. Take Revenge. Restore Your Honor. Kill Ingeniously.",

      description: "From the creator of Pony Island and The Hex comes the latest mind melting, self-destructing 
      love letter to video games. Inscryption is an inky black card-based odyssey that blends the deckbuilding 
      roguelike, escape-room style puzzles, and psychological horror into a blood-laced smoothie. Darker still 
      are the secrets inscrybed upon the cards...
      In Inscryption you will...
      Acquire a deck of woodland creature cards by draft, surgery, and self mutilation
      Unlock the secrets lurking behind the walls of Leshy's cabin
      Embark on an unexpected and deeply disturbing odyssey",

      release_date: Date.parse('Mar 21, 2019'),
      developer: "FromSoftware",
      publisher: "Activision",
      price: 59.99
    )

     # ===============================================================================================================

     Game.create!(
      title: "Counter-Strike: Global Offensive",
      genre: "Action",
      details: "Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay 
      that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, 
      and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).",

      description: "Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago.

      CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).
      
      Counter-Strike took the gaming industry by surprise when the unlikely MOD became the most played online PC 
      action game in the world almost immediately after its release in August 1999, said Doug Lombardi at Valve. 
      For the past 12 years, it has continued to be one of the most-played games in the world, headline competitive 
      gaming tournaments and selling over 25 million units worldwide across the franchise. CS: GO promises to expand on CS 
      award-winning gameplay and deliver it to gamers on the PC as well as the next gen consoles and the Mac.",

      release_date: Date.parse('Aug 21, 2012'),
      developer: "Valve, Hidden Path Entertainment",
      publisher: "Valve",
      price: 0
    )

     # ===============================================================================================================

     Game.create!(
      title: "PUBG: BATTLEGROUNDS",
      genre: "Action",
      details: "Play PUBG: BATTLEGROUNDS for free. Land on strategic locations, 
      loot weapons and supplies, and survive to become the last team standing across 
      various, diverse Battlegrounds. Squad up and join the Battlegrounds for the original 
      Battle Royale experience that only PUBG: BATTLEGROUNDS",

      description: "LAND, LOOT, SURVIVE!
      Play PUBG: BATTLEGROUNDS for free.
      Land on strategic locations, loot weapons and supplies, and survive to become the last team standing across various, diverse Battlegrounds.
      Squad up and join the Battlegrounds for the original Battle Royale experience that only PUBG: BATTLEGROUNDS can offer.
      
      This content download will also provide access to the BATTLEGROUNDS Test Server, which requires a separate download to play. 
      Optional in-game purchases available.",

      release_date: Date.parse('Dec 21, 2017'),
      developer: "KRAFTON, Inc.",
      publisher: "KRAFTON, Inc.",
      price: 0
    )

     # ===============================================================================================================

     Game.create!(
      title: "The Elder Scrolls V: Skyrim",
      genre: "RPG",
      details: "Winner of more than 200 Game of the Year Awards, Skyrim Special Edition brings the epic fantasy to 
      life in stunning detail. The Special Edition includes the critically acclaimed game and add-ons with all-new 
      features like remastered art and effects.",

      description: "Winner of more than 200 Game of the Year Awards, Skyrim Special Edition brings the epic 
      fantasy to life in stunning detail. The Special Edition includes the critically acclaimed game and add-ons 
      with all-new features like remastered art and effects, volumetric god rays, dynamic depth of field, screen-space 
      reflections, and more. Skyrim Special Edition also brings the full power of mods to the PC and consoles. New quests, 
      environments, characters, dialogue, armor, weapons and more - with Mods, there are no limits to what you can experience.",

      release_date: Date.parse('Oct 27, 2016'),
      developer: "Bethesda Game Studios",
      publisher: "Bethesda Softworks",
      price: 39.99
    )
  
    # =================================== reviews for games ===================================

    user_ids = (1..10).to_a
    game_ids = (1..10).to_a

    50.times do
      author_id = user_ids.sample
      game_id = game_ids.sample

      unless Review.exists?(author_id: author_id, game_id: game_id)
        Review.create!(
          author_id: author_id,
          game_id: game_id,
          body: Faker::Lorem.sentence,
          recommended: [true, false].sample
        )
      end
    end
  
    # puts "Done!"
  end

  # =================================== images for games ===================================
  puts "Attaching images..."

  game = Game.find_by(title: "The Witcher 3: Wild Hunt")
  images_to_attach = [
    'https://steamer-prod.s3.amazonaws.com/w3/w1.png', 
    'https://steamer-prod.s3.amazonaws.com/w3/w2.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/w3/w3.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/w3/w4.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/w3/w5.jpeg'
  ]

  images_to_attach.each do |image_path|
    image_file = URI.open(image_path)
    game.images.attach(io: image_file, filename: File.basename(image_path))
  end

# ===============================================================================================================
  
  game = Game.find_by(title: "Darkest Dungeon II")
  images_to_attach = [
    'https://steamer-prod.s3.amazonaws.com/dd2/dd1.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/dd2/dd2.png', 
    'https://steamer-prod.s3.amazonaws.com/dd2/dd3.png', 
    'https://steamer-prod.s3.amazonaws.com/dd2/dd4.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/dd2/dd5.png'
  ]

  images_to_attach.each do |image_path|
    image_file = URI.open(image_path)
    game.images.attach(io: image_file, filename: File.basename(image_path))
  end

# ===============================================================================================================

  game = Game.find_by(title: "Resident Evil 4")
  images_to_attach = [
    'https://steamer-prod.s3.amazonaws.com/re4/re1.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/re4/re2.jpg', 
    'https://steamer-prod.s3.amazonaws.com/re4/re3.jpg', 
    'https://steamer-prod.s3.amazonaws.com/re4/re4.jpg', 
    'https://steamer-prod.s3.amazonaws.com/re4/re5.jpg'
  ]

  images_to_attach.each do |image_path|
    image_file = URI.open(image_path)
    game.images.attach(io: image_file, filename: File.basename(image_path))
  end

# ===============================================================================================================

  game = Game.find_by(title: "Lost Ark")
  images_to_attach = [
    'https://steamer-prod.s3.amazonaws.com/la/la1.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/la/la2.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/la/la3.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/la/la4.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/la/la5.jpg'
  ]

  images_to_attach.each do |image_path|
    image_file = URI.open(image_path)
    game.images.attach(io: image_file, filename: File.basename(image_path))
  end

# ===============================================================================================================

  game = Game.find_by(title: "Ori and the Will of the Wisps")
  images_to_attach = [
    'https://steamer-prod.s3.amazonaws.com/ori/ori1.jpg', 
    'https://steamer-prod.s3.amazonaws.com/ori/ori2.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/ori/ori3.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/ori/ori4.png', 
    'https://steamer-prod.s3.amazonaws.com/ori/ori5.jpeg'
  ]

  images_to_attach.each do |image_path|
    image_file = URI.open(image_path)
    game.images.attach(io: image_file, filename: File.basename(image_path))
  end

# ===============================================================================================================

  game = Game.find_by(title: "Stardew Valley")
  images_to_attach = [
    'https://steamer-prod.s3.amazonaws.com/sv/sv1.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/sv/sv2.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/sv/sv3.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/sv/sv4.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/sv/sv5.jpeg'
  ]

  images_to_attach.each do |image_path|
    image_file = URI.open(image_path)
    game.images.attach(io: image_file, filename: File.basename(image_path))
  end

# ===============================================================================================================

  game = Game.find_by(title: "Inscryption")
  images_to_attach = [
    'https://steamer-prod.s3.amazonaws.com/in/in1.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/in/in2.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/in/in3.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/in/in4.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/in/in5.jpeg'
  ]

  images_to_attach.each do |image_path|
    image_file = URI.open(image_path)
    game.images.attach(io: image_file, filename: File.basename(image_path))
  end

# ===============================================================================================================

  game = Game.find_by(title: "Sekiro: Shadows Die Twice")
  images_to_attach = [
    'https://steamer-prod.s3.amazonaws.com/sk/sk1.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/sk/sk2.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/sk/sk3.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/sk/sk4.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/sk/sk5.jpeg'
  ]

  images_to_attach.each do |image_path|
    image_file = URI.open(image_path)
    game.images.attach(io: image_file, filename: File.basename(image_path))
  end

# ===============================================================================================================

  game = Game.find_by(title: "Counter-Strike: Global Offensive")
  images_to_attach = [
    'https://steamer-prod.s3.amazonaws.com/cs/cs1.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/cs/cs2.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/cs/cs3.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/cs/cs4.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/cs/cs5.jpeg'
  ]

  images_to_attach.each do |image_path|
    image_file = URI.open(image_path)
    game.images.attach(io: image_file, filename: File.basename(image_path))
  end

# ===============================================================================================================

  game = Game.find_by(title: "PUBG: BATTLEGROUNDS")
  images_to_attach = [
    'https://steamer-prod.s3.amazonaws.com/pg/pg1.jpg', 
    'https://steamer-prod.s3.amazonaws.com/pg/pg2.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/pg/pg3.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/pg/pg4.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/pg/pg5.jpeg'
  ]

  images_to_attach.each do |image_path|
    image_file = URI.open(image_path)
    game.images.attach(io: image_file, filename: File.basename(image_path))
  end

# ===============================================================================================================

  game = Game.find_by(title: "The Elder Scrolls V: Skyrim")
  images_to_attach = [
    'https://steamer-prod.s3.amazonaws.com/sr/sr1.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/sr/sr2.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/sr/sr3.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/sr/sr4.jpeg', 
    'https://steamer-prod.s3.amazonaws.com/sr/sr5.jpeg'
  ]

  images_to_attach.each do |image_path|
    image_file = URI.open(image_path)
    game.images.attach(io: image_file, filename: File.basename(image_path))
  end


  puts "All Done!"