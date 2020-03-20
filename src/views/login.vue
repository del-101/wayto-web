<template>
    <div class="v-login" @keyup.enter="onSubmit">
        <div class="login-logo">
            <h2 class="name">DEMO</h2>
        </div>
        <div class="login-box">
            <!-- 登录视图 BEGIN -->
            <div class="login-content-box" v-show="showFindPwd === false">
                <h3>请登录</h3>
                <!-- 表单 BEGIN -->
                <i-form ref="loginForm" :model="model" :rules="rules" @submit.prevent>
                    <!-- 表单输入区 BEGIN -->
                    <div class="form-main">
                        <!-- 账号 BEGIN -->
                        <i-form-item prop="username">
                            <label>账号</label>
                            <i-input type="text" placeholder="请输入用户账号" v-model="model.username"></i-input>
                        </i-form-item>
                        <!-- 账号 END -->

                        <!-- 密码 BEGIN -->
                        <i-form-item prop="password">
                            <label>密码</label>
                            <i-input type="password" placeholder="请输入密码" v-model="model.password"></i-input>
                            <div class="error-tip-border-left" v-show="false"></div>
                        </i-form-item>
                        <!-- 密码 END -->

                        <!-- 验证码 BEGIN -->
                        <i-form-item prop="verifyCode" v-if="showVerifyCode" class="error-tip-bottom">
                            <label>验证码</label>
                            <i-input type="text" placeholder="请输入验证码" v-model="model.verifyCode"></i-input>
                            <div class="verify-code-box" @click="getVerifyImg">
                                <img :src="verifyImg" alt="验证码">
                            </div>
                            <div class="error-tip-border-left" v-show="false"></div>
                        </i-form-item>
                        <!-- 验证码 END -->
                    </div>
                    <!-- 表单输入区 END -->

                    <!-- 忘记密码 BEGIN -->
                    <i-form-item>
                        <div class="forget-pwd" @click="forgetPwd(true)">忘记密码？</div>
                    </i-form-item>
                    <!-- 忘记密码 END -->

                    <!-- 登录 BEGIN -->
                    <i-form-item>
                        <i-button class="submit" type="primary" :loading="isHandling" @click="onSubmit">
                            <template>登录</template>
                        </i-button>
                    </i-form-item>
                    <!-- 登录 END -->
                </i-form>
                <!-- 表单 END -->
            </div>
            <!-- 登录视图 END -->

            <!-- 找回密码 BEGIN -->
            <div class="login-content-box find" v-show="showFindPwd === true">
                <h3>找回密码</h3>
                <!-- 表单 BEGIN -->
                <i-form ref="findForm" :model="findModel" :rules="findRules" @submit.prevent>
                    <div class="form-main">
                        <!-- 账号 BEGIN -->
                        <i-form-item prop="username">
                            <label>账号</label>
                            <i-input type="text" placeholder="请输入用户账号" v-model="findModel.username"></i-input>
                        </i-form-item>
                        <!-- 账号 END -->

                        <!-- 新密码 BEGIN -->
                        <i-form-item prop="newPwd">
                            <label>新密码</label>
                            <i-input type="password" placeholder="请输入密码" v-model="findModel.newPwd"></i-input>
                        </i-form-item>
                        <!-- 新密码 END -->

                        <!-- 再次确认密码 BEGIN -->
                        <i-form-item prop="confirmPassword">
                            <label>再次确认密码</label>
                            <i-input type="password" placeholder="请输入密码" v-model="findModel.confirmPassword"></i-input>
                        </i-form-item>
                        <!-- 再次确认密码 END -->

                        <!-- 手机号 BEGIN -->
                        <i-form-item prop="mobile">
                            <label>手机号</label>
                            <i-input type="text" placeholder="请输入手机号" v-model="findModel.mobile"></i-input>
                        </i-form-item>
                        <!-- 手机号 END -->

                        <!-- 验证码 BEGIN -->
                        <i-form-item prop="code" class="error-tip-bottom">
                            <label>验证码</label>
                            <i-input type="password" placeholder="请输入验证码" v-model="findModel.code"></i-input>
                            <div :class="`send-code ${sendCodeCoolingTimer && 'disable'}`" @click="sendCode">{{sendCodeTips}}</div>
                        </i-form-item>
                        <!-- 验证码 END -->
                    </div>

                    <i-form-item>
                        <div class="to-login">已有账号，<span @click="forgetPwd(false)">去登录</span></div>
                    </i-form-item>

                    <!-- 登录 BEGIN -->
                    <i-form-item>
                        <i-button class="submit" type="primary" :loading="isHandling" @click="onSubmit">
                            <template>登录</template>
                        </i-button>
                    </i-form-item>
                    <!-- 登录 END -->
                </i-form>
                <!-- 表单 END -->
            </div>
            <!-- 找回密码 END -->
        </div>
    </div>
</template>

<script lang="ts">
import { Form } from "iView";
import { component, View } from "uxmid-web";
import { UserService } from "src/services";
import { service } from "common/decorator";
import { ILoginModel, IFindPsdModel, IUserProfile } from "src/models";
import { formatString } from "common/utils/extends";
import patterns from "common/utils/patterns";
import messages from "common/utils/messages";

@component
export default class Login extends View
{
    /**
     * 请求服务。
     * @member
     * @private
     * @returns {UserService}
     */
    @service("UserService")
    private service: UserService;

    /**
     * 获取或设置视图使用的模型实例。
     * @member
     * @protected
     * @returns {ILoginModel}
     */
    protected model: ILoginModel =
    {
        username: "",
        password: "",
        auth_type: "", // vc
        verifyCode: "",
        isVerifyCode: false,
        vc_uuid: undefined // 验证码随机数
    };

    /**
     * 登录前表单验证。
     * @member
     * @protected
     * @returns {any}
     */
    protected rules: any =
    {
        username:
        [
            {
                required: true,
                message: "请输入用户账号"
            }
        ],
        password:
        [
            {
                required: true,
                message: "请输入密码",
                trigger: "blur"
            }
        ],
        verifyCode:
        [
            {
                required: false,
                message: "请输入验证码",
                trigger: "blur"
            }
        ]
    };

    /**
     * 获取或设置视图使用的模型实例。
     * @member
     * @protected
     * @returns {IFindPsdModel}
     */
    protected findModel: IFindPsdModel =
    {
        username: "",
        mobile: "",
        code: "",
        newPwd: "",
        confirmPassword: ""
    };

    /**
     * 设置找回密码必填验证
     * @member
     * @protected
     * @returns {any}
     */
    protected findRules: any =
    {
        
        username:
        [
            {
                required: true,
                message: "请输入用户账号。",
                trigger: "blur"
            }
        ],
        mobile:
        [
            {
                required: true,
                trigger: "blur",
                pattern: patterns["mobile"],
                message: formatString(messages["field.invalid"], ["手机号"]),
                transform: (value: string) =>
                {
                    if(value)
                    {
                        return value.toString().trim();
                    }

                    return value;
                }
            },
            {
                max: 11,
                message: formatString(messages["field.string.max"], [11])
            }
        ],
        code:
        [
            {
                required: true,
                message: "请输入手机号验证码",
                trigger: "blur"
            }
        ],
        newPwd:
        [
            {
                required: true,
                trigger: "blur",
                message: formatString(messages["field.input.required"], ["新密码"])
            },
            {
                min: 6,
                max: 16,
                message: formatString(messages["field.string.range"], [6, 16])
            }
        ],
        
        confirmPassword:
        [
            {
                required: true,
                trigger: "blur",
                message: formatString(messages["field.input.required"], ["确认新密码"])
            },
            {
                min: 6,
                max: 16,
                message: formatString(messages["field.string.range"], [6, 16])
            }
        ]
    };

    /**
     * 发送验证码提示
     * @member
     * @protected
     * @returns {string}
     */
    protected sendCodeTips: string = "获取验证码";

    /**
     * 防止重复点击
     * @member
     * @protected
     * @returns {boolean}
     */
    protected isHandling: boolean = false;

    /**
     * 验证码路径
     * @member
     * @protected
     * @returns {blob}
     */
    protected verifyImg: string = null;

    /**
     * 是否需要输入验证码
     * @member
     * @protected
     * @returns {boolean}
     */
    protected showVerifyCode: boolean = false;

    /**
     * 记录错误次数
     * @member
     * @protected
     * @returns {number}
     */
    protected errorCount: number = 0;

    /**
     * 找回密码视图
     * @member
     * @protected
     * @returns {boolean}
     */
    protected showFindPwd: boolean = false;

    /**
     * 手机验证码功能冷却时间
     * @member
     * @protected
     * @returns {number}
     */
    protected sendCodeCoolingTime: number = 20;

    /**
     * 手机验证码功能冷却时间
     * @member
     * @protected
     * @returns {number}
     */
    protected sendCodeCoolingTimer: number = null;

    /**
     * 找回密码获取手机验证码
     * @member
     * @protected
     * @returns {Promise<void>}
     */
    protected async getVerifyImg(): Promise<void>
    {
        this.model.vc_uuid = new Date().getTime();
        try
        {
            const { content } = await this.service.getVerifyImg(this.model.vc_uuid);

            this.verifyImg = window.URL.createObjectURL(content);
        }
        catch(error)
        {
            error.message && this.$message.error(error.message);
        }
    }

    /**
     * 找回密码&去登录
     * @member
     * @protected
     * @returns {void}
     */
    protected forgetPwd(isForget): void
    {
        this.showFindPwd = isForget;
        const $form = this.$refs[isForget ? "findForm" : "loginForm"] as Form;
        // 重置用户输入
        $form.resetFields();

        if (isForget)
        {
            // 手机验证码功能冷却
            const isCooling: string = localStorage.getItem("__sendCodeCooling__");
            if (isCooling)
            {
                // 上一次记录时间
                const lastTime: number = Number.parseInt(isCooling);
                // 当前时间
                const nowTime: number = new Date().getTime();
                // 计算出的间隔时间
                const gapSecond: number = (nowTime - lastTime) / 1000;
                // 期望冷却时间
                const sendCodeCoolingTime = this.sendCodeCoolingTime;

                if (gapSecond < 20)
                {
                    // 剩余冷却时间
                    const remainTime: number = Number.parseInt((sendCodeCoolingTime - gapSecond).toString());
                    this.sendCodeCoolingTime = remainTime;
                    this.sendCodeCooling();
                }
            }
        }
    }

    /**
     * 获取手机验证码
     * @member
     * @protected
     * @returns {Promise<void>}
     */
    protected async sendCode(): Promise<void>
    {
        // 过滤规则
        if (this.sendCodeTips !== "获取验证码")
        {
            return;
        }
        else if (!this.findModel.username)
        {
            this.$message.warning("请先输入账号");
            return;
        } else if (!this.findModel.mobile)
        {
            this.$message.warning("请先输入手机号");
            return;
        }

        // 发送之前，将当前时间戳记录
        const nowTime = new Date().getTime().toString();
        localStorage.setItem("__sendCodeCooling__", nowTime);

        try
        {
            // 发送短信验证码
            const res = await this.service.findPwdMsgCode(this.findModel);
            this.$message.success("发送成功");
            this.sendCodeCooling();
        }
        catch({ msg })
        {
            this.$message.error(msg);
        }
    }

    /**
     * 手机验证码功能冷却
     * @member
     * @protected
     * @returns {void}
     */
    protected sendCodeCooling(): void
    {
        this.sendCodeTips = `${this.sendCodeCoolingTime--}s`;

        // 冷却倒数
        this.sendCodeCoolingTimer = setInterval(() =>
        {
            if (this.sendCodeCoolingTime === 0)
            {
                clearInterval(this.sendCodeCoolingTimer);
                this.sendCodeCoolingTimer = null;
                this.sendCodeTips = "获取验证码";
                this.sendCodeCoolingTime = 20;
                localStorage.removeItem("__sendCodeCooling__");
                return;
            }
            this.sendCodeTips = `${this.sendCodeCoolingTime--}s`;
        }, 1000);
    }

    /**
     * 当提交登录表单时调用。
     * @protected
     * @param  {MouseEvent} e 鼠标事件参数。
     * @returns {void}
     */
    protected onSubmit(e: MouseEvent): void
    {
        const $form = this.showFindPwd ? this.$refs.findForm as Form : this.$refs.loginForm as Form;
        $form.validate(async (isValid: boolean) =>
        {
            if(isValid)
            {
                if(this.isHandling)
                {
                    return;
                }
                this.isHandling = true;
                try
                {
                    if (this.showFindPwd)
                    {
                        // 找回密码后再调用登录接口
                        const { content } = await this.service.findPassword(this.findModel);
                        this.model.username = this.findModel.username;
                        this.model.password = this.findModel.newPwd;
                    }
                    // 调用登录接口
                    await this.service.login(this.model);
                    
                    // 路由跳转
                    this.$router.push("/home");
                }
                catch({ msg })
                {
                    // 记录错误次数，大于等于5次 需要输入验证码
                    if (this.errorCount >= 5)
                    {
                        this.showVerifyCode = true;
                        // 参数携带验证码
                        this.model.isVerifyCode = true;
                        // 开启验证码格式验证
                        this.rules.verifyCode[0].required = true;
                        // 获取验证码
                        this.getVerifyImg();
                    }
                    else
                    {
                        this.errorCount++;
                    }
                    
                    this.$message.error(msg);
                }
                finally
                {
                    this.isHandling = false;
                }
            }
        });
    }

    /**
     * 获取当前用户的信息。
     * @protected
     * @property
     * @returns IUserProfile
     */
    protected get user(): IUserProfile
    {
        return this.$store.getters["user/profile"] || {};
    }

    /**
     * 检查当前登录状态
     * @member
     * @protected
     * @returns {void}
     */
    protected isLogin(): void
    {
        console.log("this.user", this.user);
        if (this.user.id)
        {
            this.$router.push("/home");
        }
    }

    /**
     * Created
     * @member
     * @protected
     * @returns {void}
     */
    protected created(): void
    {
        this.isLogin();
    }
}
</script>

<style lang="less">
@import "~styles/views/login";
</style>
