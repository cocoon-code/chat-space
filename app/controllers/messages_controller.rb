class MessagesController < ApplicationController
  def index
    @messages = []
    @messages << message = {user: "kosuke", date: "2019/12/22 15:00", message: "hello"}
    @messages << message = {user: "kosuke", date: "2019/12/22 15:10", message: "hi"}
  end
end
