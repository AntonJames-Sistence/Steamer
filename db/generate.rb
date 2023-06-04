# require_relative 'config/environment'
require 'active_storage'
require "active_job/railtie"
require "active_storage/engine"

def attach_images_to_dd2_game
  # Ensure the Active Storage service is configured
  Rails.application.eager_load!

  dd2 = Game.find_by(id: 1)

  images_to_attach1 = ['./app/assets/dd2/dd1.jpeg', './app/assets/dd2/dd2.png', './app/assets/dd2/dd3.png', './app/assets/dd2/dd4.jpeg', './app/assets/dd2/dd5.png']
  
  images_to_attach1.each do |image_path|
    image_file = File.open(image_path)
    dd2.images.attach(io: image_file, filename: File.basename(image_path))
  end

  re4 = Game.find_by(id: 2)

  images_to_attach2 = ['./app/assets/re4/re1.jpeg', './app/assets/re4/re2.jpg', './app/assets/re4/re3.jpg', './app/assets/re4/re4.jpg', './app/assets/re4/re5.jpg']
  
  images_to_attach2.each do |image_path|
    image_file = File.open(image_path)
    re4.images.attach(io: image_file, filename: File.basename(image_path))
  end

  la = Game.find_by(id: 3)

  images_to_attach3 = ['./app/assets/la/la1.jpeg', './app/assets/la/la2.jpeg', './app/assets/la/la3.jpeg', './app/assets/la/la4.jpeg', './app/assets/la/la5.jpg']
  
  images_to_attach3.each do |image_path|
    image_file = File.open(image_path)
    la.images.attach(io: image_file, filename: File.basename(image_path))
  end
end

# Call the method to attach the images
attach_images_to_dd2_game