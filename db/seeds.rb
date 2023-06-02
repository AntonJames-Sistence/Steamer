# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Game.destroy_all
    
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('games')
  
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

    # =================================== games ===================================

    puts "Creating games..."

    Game.create!(
      title: "Darkest Dungeon II",
      genre: "RPG",
      details: "Darkest Dungeon II is a roguelike road trip of the damned. 
                Form a party, equip your stagecoach, and set off across the decaying 
                landscape on a last gasp quest to avert the apocalypse. The greatest 
                dangers you face, however, may come from within...",

      description: "Darkest Dungeon II is a roguelike road trip of the damned. Form a party, equip your stagecoach, and set off across the decaying landscape on a last gasp quest to avert the apocalypse. The greatest dangers you face, however, may come from within...

                    Gather your courage and ride out into the chaos of a world undone.
                    Four heroes and a stagecoach are all that stand between darkness and salvation.
                    
                    Tried and True Turn-based Combat, Improved!
                    The ground-breaking genre-defining combat from Darkest Dungeon returns, but everything from stats to rules has been refined and improved. The all new Token System helps make your decisions impactful while adding even more depth of play.",

      release_date: Date.parse('May 8, 2023'),
      developer: "Red Hook Studios",
      publisher: "Red Hook Studios",
      price: 39.99
    )

    Game.create!(
      title: "Resident Evil 4",
      genre: "Action",
      details: "Survival is just the beginning. Six years have passed since the biological 
                disaster in Raccoon City. Leon S. Kennedy, one of the survivors, tracks the 
                president's kidnapped daughter to a secluded European village, where there 
                is something terribly wrong with the locals.",

      description: "Survival is just the beginning.

                    Six years have passed since the biological disaster in Raccoon City.
                    Agent Leon S. Kennedy, one of the survivors of the incident, has been sent to rescue the president's kidnapped daughter.
                    He tracks her to a secluded European village, where there is something terribly wrong with the locals.
                    And the curtain rises on this story of daring rescue and grueling horror where life and death, terror and catharsis intersect.
      
                    Featuring modernized gameplay, a reimagined storyline, and vividly detailed graphics,
                    Resident Evil 4 marks the rebirth of an industry juggernaut.
      
                    Relive the nightmare that revolutionized survival horror.",

      release_date: Date.parse('Mar 23, 2023'),
      developer: "CAPCOM Co., Ltd.",
      publisher: "CAPCOM Co., Ltd.",
      price: 59.99
    )

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
  
    puts "Done!"
  end