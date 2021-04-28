<!-- 实验课题管理 -->
<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <h2>技术栈</h2>
      <p class="para">本系统是基于 Spring Boot 2.1.0 、 Spring Boot Jpa、 JWT、Spring Security、Redis、Vue、Element-UI 的前后端分离的后台管理系统</p>
      <h2>使用说明</h2>
      <p class="para">
        实验教学管理系统分为登录、个人中心、实验报告管理、我的实验、实验课题管理、实验室管理、用户管理、角色管理、菜单管理等模块。根据不同的角色权限向不同的用户展示
        不同的可选择菜单和权限，管理员可以创建角色，创建用户，对角色赋予权限等管理功能及实验室管理功能。教师登录系统后，可以创建实验课题，并且选择实验室和本次实验的学生
        进行实验，派发后，该实验室进入使用中状态，其他老师就无法选择此实验室了，并且所选中的学生，可在我的实验-待完成处查看分配给自己的实验。学生可进行答题，填写实验报告，点击提交后。我的实验-待完成
        处该条实验就进入到待审核状态，此时可在我的实验-待批改处找到该条实验，并且教师在实验报告管理-待批改查找到这条报告进行批改。批改后的报告进入到已批改。学生可在我的实验-
        已完成处找到该条报告并可查看成绩及批语。试验结束后，教师可通知管理员重新对该实验室维护及开放。
      </p>
      <h2>Version</h2>
      <p class="para">
        V2021-3-19-01
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Help',
  components: {},
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    
  },
  mounted() {
  }
}
</script>

<style scoped>
.para {
  line-height: 30px;
}
</style>
