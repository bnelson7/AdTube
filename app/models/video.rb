class Video < ApplicationRecord

    validates :title, presence: true

    has_one_attached :thumbnail

    has_one_attached :clip
end
