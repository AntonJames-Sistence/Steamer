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
      title: 'Darkest Dungeon II',
      genre: 'RPG',
      details: 'Darkest Dungeon II is a roguelike road trip of the damned. 
                Form a party, equip your stagecoach, and set off across the decaying 
                landscape on a last gasp quest to avert the apocalypse. The greatest 
                dangers you face, however, may come from within...',

      description: 'Darkest Dungeon II is a roguelike road trip of the damned. Form a 
                    party, equip your stagecoach, and set off across the decaying landscape 
                    on a last gasp quest to avert the apocalypse. The greatest dangers 
                    you face, however, may come from within...
                    Gather your courage and ride out into the chaos of a world undone.
                    Four heroes and a stagecoach are all that stand between darkness 
                    and salvation. Tried and True Turn-based Combat, Improved
                    The ground-breaking genre-defining combat from Darkest Dungeon 
                    returns, but everything from stats to rules has been refined and 
                    improved. The all new Token System helps make your decisions 
                    impactful while adding even more depth of play.',

      release_date: Date.parse('May 8, 2023'),
      developer: 'Red Hook Studios',
      publisher: 'Red Hook Studios',
      price: 39.99
    )
  
    puts "Done!"
  end