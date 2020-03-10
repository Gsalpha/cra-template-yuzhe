export const baseValidate = {
    required(message: string) {
        return {
            required: true,
            message
        }
    },
    phone(message: string = '请输入正确的手机号') {
        return {
            pattern: /^1([3456789])\d{9}$/,
            message
        }
    }
}
