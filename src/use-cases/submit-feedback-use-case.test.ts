import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const creatFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: creatFeedbackSpy },
  { sendMail: sendMailSpy}
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Está tudo Bugado',
      screenshot: 'data:image/png;base64,6516s8a4d6sa5d468as5d3as'
    })).resolves.not.toThrow()

    expect(creatFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should not be able to submit feedback without type', async () => {
    
    await expect(submitFeedback.execute({
      type: '',
      comment: 'Está tudo Bugado',
      screenshot: 'data:image/png;base64,6516s8a4d6sa5d468as5d3as'
    })).rejects.toThrow()
  })

  it('should not be able to submit feedback without an invalid screenshot', async () => {
    
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Está tudo Bugado',
      screenshot: 'teste.jpg'
    })).rejects.toThrow()
  })
})
