json.extract! user, :id, :username, :email, :created_at, :updated_at

if user.photo.attached?
    json.photoUrl url_for(user.photo)
end


 



