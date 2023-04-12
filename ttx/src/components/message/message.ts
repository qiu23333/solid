import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      info () {
        message.info(
          "I don't know why nobody told you how to unfold your love",
          {
            keepAliveOnHover: true
          }
        )
      },
      error () {
        message.error('Once upon a time you dressed so fine')
      },
      warning () {
        message.warning('How many roads must a man walk down')
      },
      success () {
        message.success(
          "'Cause you walked hand in hand With another man in my place"
        )
      },
      loading () {
        message.loading(
          'If I were you, I will realize that I love you more than any other guy'
        )
      }
    }
  }
})