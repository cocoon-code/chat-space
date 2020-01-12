require 'rails_helper'
describe Message do
  describe '#create' do
    it "is valid content" do
      message = build(:message, image: nil)
      expect(message).to be_valid
    end

    it "is valid image" do
      message = build(:message, content: nil)
      expect(message).to be_valid
    end

    it "is valid image and content" do
      message = build(:message)
      expect(message).to be_valid
    end

    it "is invalid without image and content" do
      message = build(:message, image: nil, content: nil)
      message.valid?
      expect(message.errors[:content]).to include("を入力してください")
    end
    
    it "is invalid without group_id" do
      message = build(:message, group_id: nil)
      message.valid?
      expect(message.errors[:group]).to include("を入力してください")
    end

    it "is invalid without user_id" do
      message = build(:message, user_id: nil)
      message.valid?
      expect(message.errors[:user]).to include("を入力してください")
    end
  end
end