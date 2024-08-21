using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NhaXeNoiBai.Model.Migrations
{
    public partial class updatePriceentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MoneyKm",
                table: "PriceEntities",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MoneyKm",
                table: "PriceEntities");
        }
    }
}
