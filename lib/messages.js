const sanitizeHTML = require('sanitize-html');

module.exports = function(url,callback){
  const mongoose = require('mongoose');
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useUnifiedTopology', true);
  mongoose.set('useFindAndModify', false);
  mongoose.connect(url,callback);

  const messageSchema = new mongoose.Schema(
      {
        username:{
          type:String,
          required:true
        },
        text:{
          type:String,
          required:true
        }
      },
      {
        strict: 'throw'
      }
  );
  const Message = mongoose.model(
      'messages',
      messageSchema
  );

  return {
    create:function(newMessage,callback){
      try {
        if(newMessage.username !== undefined && typeof newMessage.username === "string" && typeof newMessage.text === "string" && newMessage.text !== undefined) {
          newMessage.username = sanitizeHTML(newMessage.username);
          newMessage.text = sanitizeHTML(newMessage.text);
        }
        var message = new Message(newMessage);
        message.save(callback);
      } catch (e) {
        callback(e);
      }

    },
    read:function(id,callback){
      Message.findById(id, callback);
    },
    readUsername:function(username,callback){
      if(typeof username === "string") {
        Message.find({username: username}, callback);
      } else {
        callback(new Error("Not a string"));
      }

    },
    readAll:function(callback){
      Message.find({}, callback);
    },
    update:function(id,updatedMessage,callback){
      Message.findByIdAndUpdate(id, updatedMessage, callback);
    },
    delete:function(id,callback){
      Message.findByIdAndDelete(id, callback);
    },
    deleteAll:function(callback){
      Message.deleteMany({},callback);
    },
    disconnect:function(){
      mongoose.disconnect();
    }
  };
};
