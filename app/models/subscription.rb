# == Schema Information
#
# Table name: subscriptions
#
#  id            :bigint           not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  subscriber_id :integer          not null
#  channel_id    :integer          not null
#
class Subscription < ApplicationRecord

    belongs_to :subscriber,
        primary_key: :id,
        foreign_key: :subscriber_id,
        class_name: :User

    belongs_to :channel,
        primary_key: :id,
        foreign_key: :channel_id,
        class_name: :Channel

end