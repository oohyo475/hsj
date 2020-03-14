<template>
  <div class="addGoods">
    <div class="content">
      <!-- title -->
      <h2 class="title">添加商品</h2>
      <!-- 商品表单 -->
      <el-form ref="goodsForm" :model="goodsForm" label-width="180px">
        <el-form-item label="商品名称">
          <el-input v-model="goodsForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="goodsForm.region" placeholder="请选择商品分类">
            <el-option label="电子" value="电子"></el-option>
            <el-option label="生鲜" value="生鲜"></el-option>
            <el-option label="进口" value="进口"></el-option>
            <el-option label="运动" value="运动"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品特色">
          <el-checkbox-group v-model="goodsForm.type">
            <el-checkbox label="新品上市" name="type"></el-checkbox>
            <el-checkbox label="第二单半价" name="type"></el-checkbox>
            <el-checkbox label="主打产品" name="type"></el-checkbox>
            <el-checkbox label="火爆产品" name="type"></el-checkbox>
            <el-checkbox label="主传手艺" name="type"></el-checkbox>
            <el-checkbox label="源自四川" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            action="http://work.08321.org/sell/goods.php?a=uploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="goodsForm.imageUrl" :src="goodsForm.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="是否促销">
          <el-radio-group v-model="goodsForm.promotion">
            <el-radio label="促销"></el-radio>
            <el-radio label="不促销"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="食品规格">
          <el-radio-group v-model="goodsForm.specification">
            <el-radio label="单规格"></el-radio>
            <el-radio label="多规格"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="包装费">
          <el-input-number v-model="goodsForm.packing" @change="handleChange" :min="0" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number v-model="goodsForm.price" @change="handleChange" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="goodsForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      goodsForm: {
        name: "", //商品名称
        region: "", //商品分类
        type: ["主打产品", "新品上市"], //商品特色
        promotion: "促销", //是否促销
        specification: "单规格", //食品规格
        desc: "", //商品描述
        packing: "", //包装费
        price: "", //价格
        imageUrl: "" //图片
      }
    };
  },
  methods: {
    //提交按钮
    onSubmit() {
      //收集数据
      var data = {
        goodsname: this.goodsForm.name,
        goodscategory: this.goodsForm.region,
        goodsfeature: this.goodsForm.type.join(","),
        isPromotion: this.goodsForm.promotion,
        standard: this.goodsForm.specification,
        packprice: this.goodsForm.packing,
        price: this.goodsForm.price,
        imgUrl: this.goodsForm.imageUrl,
        goodsdesc: this.goodsForm.desc
      };
      //向后台发送数据
      axios
        .post("http://work.08321.org/sell/goods.php?a=add", qs.stringify(data))
        .then(res => {
          if (res.data.code === 0) {
            this.$message({
              //成功提示
              message: res.data.msg,
              type: "success"
            });
            this.$router.push('/home/Admin_goodsList');//跳转到商品列表页面
          }else{
            this.$message.error(res.data.msg);
          }
        });
    },
    handleAvatarSuccess(res) {
      console.log(res.data);
      this.goodsForm.imageUrl = "http://work.08321.org" + res.data; //拼接图片地址
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isJPG && isLt1M;
    },
    //包装费
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>

<style>
.el-form {
  margin-top: 20px;
  width: 500px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>