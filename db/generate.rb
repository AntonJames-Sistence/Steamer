# require_relative 'config/environment'
require 'active_storage'
require "active_job/railtie"
require "active_storage/engine"

ActiveStorage::Attachment.where(record_type: "Game", name: "images").find_each do |attachment|
  attachment.purge
end

def attach_images_to_dd2_game
  # Ensure the Active Storage service is configured
  Rails.application.eager_load!

  # ===============================================================================================================

  w3 = Game.find_by(id: 1)

  images_to_attach1 = ['./app/assets/w3/w1.png', './app/assets/w3/w2.jpeg', './app/assets/w3/w3.jpeg', './app/assets/w3/w4.jpeg', './app/assets/w3/w5.jpg']
  
  images_to_attach1.each do |image_path|
    image_file = File.open(image_path)
    w3.images.attach(io: image_file, filename: File.basename(image_path))
  end

  # ===============================================================================================================
  
  dd2 = Game.find_by(id: 2)

  images_to_attach2 = ['./app/assets/dd2/dd1.jpeg', './app/assets/dd2/dd2.png', './app/assets/dd2/dd3.png', './app/assets/dd2/dd4.jpeg', './app/assets/dd2/dd5.png']
  
  images_to_attach2.each do |image_path|
    image_file = File.open(image_path)
    dd2.images.attach(io: image_file, filename: File.basename(image_path))
  end

  # ===============================================================================================================

  re4 = Game.find_by(id: 3)

  images_to_attach3 = ['./app/assets/re4/re1.jpeg', './app/assets/re4/re2.jpg', './app/assets/re4/re3.jpg', './app/assets/re4/re4.jpg', './app/assets/re4/re5.jpg']
  
  images_to_attach3.each do |image_path|
    image_file = File.open(image_path)
    re4.images.attach(io: image_file, filename: File.basename(image_path))
  end

  # ===============================================================================================================

  la = Game.find_by(id: 4)

  images_to_attach4 = ['./app/assets/la/la1.jpeg', './app/assets/la/la2.jpeg', './app/assets/la/la3.jpeg', './app/assets/la/la4.jpeg', './app/assets/la/la5.jpg']
  
  images_to_attach4.each do |image_path|
    image_file = File.open(image_path)
    la.images.attach(io: image_file, filename: File.basename(image_path))
  end

  # ===============================================================================================================
  ori = Game.find_by(id: 5)

  images_to_attach5 = ['./app/assets/ori/ori1.jpg', './app/assets/ori/ori2.jpeg', './app/assets/ori/ori3.jpeg', './app/assets/ori/ori4.png', './app/assets/ori/ori5.jpeg']
  
  images_to_attach5.each do |image_path|
    image_file = File.open(image_path)
    ori.images.attach(io: image_file, filename: File.basename(image_path))
  end

  # ===============================================================================================================
  sv = Game.find_by(id: 6)

  images_to_attach6 = ['./app/assets/sv/sv1.jpeg', './app/assets/sv/sv2.jpeg', './app/assets/sv/sv3.jpeg', './app/assets/sv/sv4.jpeg', './app/assets/sv/sv5.jpeg']
  
  images_to_attach6.each do |image_path|
    image_file = File.open(image_path)
    sv.images.attach(io: image_file, filename: File.basename(image_path))
  end

  # ===============================================================================================================
  ins = Game.find_by(id: 7)

  images_to_attach7 = ['./app/assets/in/in1.jpeg', './app/assets/in/in2.jpeg', './app/assets/in/in3.jpeg', './app/assets/in/in4.jpeg', './app/assets/in/in5.jpeg']
  
  images_to_attach7.each do |image_path|
    image_file = File.open(image_path)
    ins.images.attach(io: image_file, filename: File.basename(image_path))
  end

  # ===============================================================================================================
  sk = Game.find_by(id: 8)

  images_to_attach8 = ['./app/assets/sk/sk1.jpeg', './app/assets/sk/sk2.jpeg', './app/assets/sk/sk3.jpeg', './app/assets/sk/sk4.jpeg', './app/assets/sk/sk5.jpeg']
  
  images_to_attach8.each do |image_path|
    image_file = File.open(image_path)
    sk.images.attach(io: image_file, filename: File.basename(image_path))
  end

  # ===============================================================================================================

end

# Call the method to attach the images
attach_images_to_dd2_game