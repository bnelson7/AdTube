# == Schema Information
#
# Table name: channels
#
#  id          :bigint           not null, primary key
#  creator_id  :integer          not null
#  subscribed  :integer          default("0"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :string
#  name        :string           not null
#
require 'test_helper'

class ChannelTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
